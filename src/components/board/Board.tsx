// Components
import Card from "../card/Card";
import ControlPanel from "../control-panel/ControlPanel";

// Hooks
import produce from "immer";
import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { ActionType, initialState, reducer } from "./reducer/reducer";

// Utils
import { chooseState } from "../../utils/choose-state";
import { findFalseValue } from "../../utils/find-false-value";

// CSS
import RoundButton from "../round-button/RoundButton";
import { boardList } from "./board-list/board-list";
import styles from "./Board.module.css";

export default function Board() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const {
    currentBoard,
    difficulty,
    firstCard,
    gameOver,
    lives,
    revealedBoard,
    isComparing,
    levelChangeDisabled,
  } = state;

  const onClickHandler = (rowId: number, colId: number) => {
    // Cannot click if the cards are currently being compared
    if (isComparing) {
      return;
    }
    // Cannot click if game is over
    if (isOver()) {
      return;
    }
    // Cannot select if card is already face up
    if (!isValidCard(rowId, colId)) {
      console.log("Invalid card. This one is already face up.");
      return;
    }
    // Shows card on click
    showCard(rowId, colId);
    // If it is not the first card, sets the value to the first card
    if (!firstCard) {
      dispatch({ type: ActionType.SET_FIRST_CARD, payload: [rowId, colId] });
      return;
    }
    if (!compareCards(rowId, colId)) {
      dispatch({ type: ActionType.SET_IS_COMPARING, payload: true });
      setTimeout(() => {
        hidePair(rowId, colId);
        removeLife();
        dispatch({ type: ActionType.SET_IS_COMPARING, payload: false });
      }, 1000);
    }
    dispatch({ type: ActionType.SET_FIRST_CARD, payload: undefined });
    isOver();
  };

  const isOver = (): boolean => {
    if (countLives() < 1) {
      dispatch({ type: ActionType.SET_GAME_OVER, payload: "You lose" });
      return true;
    }
    if (!findFalseValue(revealedBoard)) {
      dispatch({ type: ActionType.SET_GAME_OVER, payload: "You win" });
      return true;
    }
    return false;
  };

  const isValidCard = (row: number, col: number): boolean => {
    return revealedBoard[row][col] === true ? false : true;
  };

  const showCard = (row: number, col: number): void => {
    dispatch({
      type: ActionType.SET_REVEALED_BOARD,
      payload: produce(revealedBoard, (draft) => {
        draft[row][col] = true;
      }),
    });
  };

  const hidePair = (row: number, col: number): void => {
    dispatch({
      type: ActionType.SET_REVEALED_BOARD,
      payload: produce(revealedBoard, (draft) => {
        draft[row][col] = false;
        draft[firstCard![0]][firstCard![1]] = false;
      }),
    });
  };

  const hideCards = (): void => {
    dispatch({
      type: ActionType.SET_REVEALED_BOARD,
      payload: boardList.invisible,
    });
  };

  const compareCards = (row: number, col: number): boolean => {
    return currentBoard[row][col] === currentBoard[firstCard![0]][firstCard![1]]
      ? true
      : false;
  };

  const countLives = (): number => {
    let count = lives.filter((x) => x === true).length;
    return count;
  };

  const removeLife = (): void => {
    let count = countLives();
    if (count < 1) {
      return;
    }
    let copy = [...lives];
    copy[count - 1] = false;
    dispatch({ type: ActionType.SET_LIVES, payload: copy });
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SET_DIFFICULTY,
      payload: Number(event.target.value),
    });
  };

  const resetGame = () => {
    let nextState = chooseState(difficulty);
    dispatch({
      type: ActionType.SET_NEW_GAME,
      payload: {
        difficulty: nextState.difficulty,
        currentBoard: nextState.currentBoard,
        revealedBoard: nextState.revealedBoard,
        lives: nextState.lives,
        isComparing: nextState.isComparing,
        gameOver: nextState.gameOver,
        levelChangeDisabled: nextState.levelChangeDisabled,
      },
    });

    setTimeout(() => {
      hideCards();
      dispatch({
        type: ActionType.SET_LEVEL_CHANGE_DISABLED,
        payload: false
      })
    }, 4000);
  };

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  return (
    <div className={styles.game}>
      <ControlPanel
        disabled={levelChangeDisabled}
        lives={lives}
        min={1}
        max={4}
        current={difficulty}
        onChange={handleLevelChange}
      ></ControlPanel>
      {gameOver !== "" ? (
        <div className={styles.gameOver}>
          <h1>{gameOver}</h1>
          <RoundButton value="Restart" onClickHandler={() => resetGame()} />
        </div>
      ) : (
        <div className={styles.board}>
          {currentBoard.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((col, colIndex) => (
                <div onClick={() => onClickHandler(rowIndex, colIndex)}>
                  <Card
                    key={colIndex}
                    value={col}
                    isVisible={revealedBoard[rowIndex][colIndex]}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
