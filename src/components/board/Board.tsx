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
import { flipSound } from "../../utils/flip-sound";
import { findFalseValue } from "../../utils/find-false-value";

// CSS
import RoundButton from "../round-button/RoundButton";
import { boardList } from "./board-list/board-list";
import styles from "./Board.module.css";

// Board main function
export default function Board() {
  // The states are controlled by the hook useImmerReducer
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

  // Function to flip the card on click if the conditions are satisfied
  const onClickHandler = (rowId: number, colId: number) => {
    if (isComparing || levelChangeDisabled) {
      return;
    }
    if (isOver()) {
      return;
    }
    if (!isValidCard(rowId, colId)) {
      return;
    }
    showCard(rowId, colId);
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
  };

  // Function to check if the game is over and change gameOver's state
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

  // Function to check if the clicked card is a valid selection
  const isValidCard = (row: number, col: number): boolean => {
    return revealedBoard[row][col] === true ? false : true;
  };

  // Function to flip the card face up
  const showCard = (row: number, col: number): void => {
    dispatch({
      type: ActionType.SET_REVEALED_BOARD,
      payload: produce(revealedBoard, (draft) => {
        draft[row][col] = true;
      }),
    });
  };

  // Function to flip face down the last selected pair of cards
  const hidePair = (row: number, col: number): void => {
    dispatch({
      type: ActionType.SET_REVEALED_BOARD,
      payload: produce(revealedBoard, (draft) => {
        draft[row][col] = false;
        draft[firstCard![0]][firstCard![1]] = false;
      }),
    });
  };

  // Function to flip face down all cards
  const hideCards = (): void => {
    dispatch({
      type: ActionType.SET_REVEALED_BOARD,
      payload: boardList.invisible,
    });
  };

  // Function to check if the last selected pair of cards have the same value
  const compareCards = (row: number, col: number): boolean => {
    return currentBoard[row][col] === currentBoard[firstCard![0]][firstCard![1]]
      ? true
      : false;
  };

  // Function to count lives
  const countLives = (): number => {
    let count = lives.filter((x) => x === true).length;
    return count;
  };

  // Function to remove life
  const removeLife = (): void => {
    let count = countLives();
    if (count < 1) {
      return;
    }
    let copy = [...lives];
    copy[count - 1] = false;
    dispatch({ type: ActionType.SET_LIVES, payload: copy });
  };

  // Function to handle difficulty change onClick
  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SET_DIFFICULTY,
      payload: Number(event.target.value),
    });
  };

  // Function to set a new state based on difficulty level
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
    // Cards are hidden after 4 seconds and user is able to change level again
    setTimeout(() => {
      hideCards();
      dispatch({
        type: ActionType.SET_LEVEL_CHANGE_DISABLED,
        payload: false,
      });
    }, 4000);
  };

  // Triggers a reset whenever the difficulty changes
  useEffect(() => {
    resetGame();
  }, [difficulty]);

  // Triggers the function that checks if the game is over
  useEffect(() =>{
    if (!levelChangeDisabled) {
      isOver();
    }
  }, [gameOver,lives])

  // Triggers the flip card sound whenever the revealed card changes
  useEffect(() => {
    flipSound();
  }, [revealedBoard])

  // Returns the game itself
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
          <h2>{gameOver}</h2>
          <RoundButton value="Play again" onClickHandler={() => resetGame()} />
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
