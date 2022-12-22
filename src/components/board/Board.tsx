// Components
import Card from "../card/Card";
import ControlPanel from "../control-panel/ControlPanel";

// Const
import { boardList } from "./board-list/board-list";

// Hooks
import { useEffect, useState } from "react";

// Utils
import { boardShuffle } from "../../utils/board-shuffle";
import { deepClone } from "../../utils/deep-clone";
import { findFalseValue } from "../../utils/find-false-value";

// CSS
import RoundButton from "../round-button/RoundButton";
import styles from "./Board.module.css";

const initialBoard = boardShuffle(1);

export default function Board() {
  const [currentBoard, setCurrentBoard] = useState<number[][]>(initialBoard);
  const [difficulty, setDifficulty] = useState<number>(1);
  const [firstCard, setFirstCard] = useState<number[] | undefined>();
  const [gameOver, setGameOver] = useState<string>();
  const [lives, setLives] = useState<boolean[]>([true, true, true, true, true]);
  const [revealedBoard, setRevealedBoard] = useState<boolean[][]>(
    boardList.visibleEasy
  );

  const onClickHandler = (rowId: number, colId: number) => {
    if (isOver()) {
      return;
    }
    if (!isValidCard(rowId, colId)) {
      console.log("Invalid card. This one is already face up.");
      return;
    }
    showCard(rowId, colId);
    if (!firstCard) {
      setFirstCard([rowId, colId]);
      return;
    }
    if (!compareCards(rowId, colId)) {
      setTimeout(() => {
        hidePair(rowId, colId);
        removeLife();        
      }, 1000);
    }
    setFirstCard(undefined);
    isOver();
  };

  const isOver = (): boolean => {
    if (countLives() < 1) {
      setGameOver("You lose");
      return true;
    }
    if (!findFalseValue(revealedBoard)) {
      setGameOver("You win");
      return true;
    }
    return false;
  };

  const isValidCard = (row: number, col: number): boolean => {
    return revealedBoard[row][col] === true ? false : true;
  };

  const showCard = (row: number, col: number): void => {
    const copyBoard = [...revealedBoard];
    copyBoard[row][col] = true;
    setRevealedBoard(copyBoard);
  };

  const hidePair = (row: number, col: number): void => {
    const copyBoard = [...revealedBoard];
    copyBoard[row][col] = false;
    copyBoard[firstCard![0]][firstCard![1]] = false;
    setRevealedBoard(copyBoard);
  };

  const hideCards = (): void => {
    switch (difficulty) {
      case 2: {
        let copy = deepClone(boardList.invisibleMedium);
        setRevealedBoard((revealedBoard) => (revealedBoard = copy));
        break;
      }
      case 3: {
        let copy = deepClone(boardList.invisibleHard);
        setRevealedBoard((revealedBoard) => (revealedBoard = copy));
        break;
      }
      default: {
        let copy = deepClone(boardList.invisibleEasy);
        setRevealedBoard((revealedBoard) => (revealedBoard = copy));
        break;
      }
    }
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
    let copy = [...lives];
    copy[count - 1] = false;
    setLives(copy);
  };

  const resetGame = () => {
    switch (difficulty) {
      case 2: {
        setLives([true, true, true, true]);
        setCurrentBoard(boardShuffle(2));
        let copy = deepClone(boardList.visibleMedium);
        setRevealedBoard((revealedBoard) => (revealedBoard = copy));
        break;
      }
      case 3: {
        setLives([true, true, true]);
        setCurrentBoard(boardShuffle(3));
        let copy = deepClone(boardList.visibleHard);
        setRevealedBoard((revealedBoard) => (revealedBoard = copy));
        break;
      }
      default: {
        setLives([true, true, true, true, true]);
        setCurrentBoard(boardShuffle(1));
        let copy = deepClone(boardList.visibleEasy);
        setRevealedBoard((revealedBoard) => (revealedBoard = copy));
        break;
      }
    }
    setTimeout(() => {
      hideCards();
    }, 4000);
    setGameOver('');
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(parseInt(event.target.value));
  };

  useEffect(() => {
    resetGame();
  }, [difficulty || resetGame]);

  return (
    <div className={styles.game}>
      <ControlPanel
        lives={lives}
        min={1}
        max={3}
        current={difficulty}
        onChange={handleLevelChange}
      ></ControlPanel>
      <div className={styles.board}>
        {currentBoard.map((row, rowId) => (
          <div className={styles.row} key={rowId}>
            {row.map((card, colId) => (
              <div
                className={styles.card}
                key={colId}
                onClick={() => onClickHandler(rowId, colId)}
              >
                <Card
                  value={card}
                  isVisible={revealedBoard[rowId][colId]}
                ></Card>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.message}>
        <h2>{gameOver}</h2>
      </div>
      <div className={styles.buttonsContainer}>
        <RoundButton value="Reset" onClickHandler={resetGame}></RoundButton>
      </div>
    </div>
  );
}
