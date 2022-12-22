// Components
import Card from "../card/Card";
import ControlPanel, { IGameOptions } from "../control-panel/ControlPanel";

// Const
import { boardList } from "./board-list/board-list";

// Hooks
import { useState, useEffect } from "react";

// Utils
import { boardShuffle } from "../../utils/board-shuffle";

// CSS
import RoundButton from "../round-button/RoundButton";
import styles from "./Board.module.css";

const initialBoard = boardShuffle(1);

export default function Board() {
  const [difficulty, setDifficulty] = useState<number>(1);
  const [lives, setLives] = useState<boolean[]>([true, true, true, true, true]);
  const [currentBoard, setCurrentBoard] = useState<number[][]>(initialBoard);
  const [firstCard, setFirstCard] = useState<number[] | undefined>();
  const [revealedBoard, setRevealedBoard] = useState<boolean[][]>(boardList.visibleEasy);

  const onClickHandler = (rowId: number, colId: number) => {
    if (livesCounter() < 1) {
      console.log(
        "You already lost. Try decreasing the difficulty and play again"
      );
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

  const compareCards = (row: number, col: number): boolean => {
    return currentBoard[row][col] === currentBoard[firstCard![0]][firstCard![1]]
      ? true
      : false;
  };

  const livesCounter = (): number => {
    let count = lives.filter((x) => x === true).length;
    return count;
  };

  const removeLife = (): void => {
    let count = livesCounter();
    let copy = [...lives];
    copy[count - 1] = false;
    setLives(copy);
  };

  const hideCards = (): void => {
    switch (difficulty) {
      case 2: {
        let copy = [...boardList.invisibleMedium];
        setRevealedBoard(copy);
        break;
      }
      case 3: {
        let copy = [...boardList.invisibleHard];
        setRevealedBoard(copy);
        break;
      }
      default: {
        let copy = [...boardList.invisibleEasy];
        setRevealedBoard(copy);
        break;
      }
    }
  };

  const resetGame = () => {
    switch (difficulty) {
      case 2: {
        setLives([true, true, true, true]);
        setCurrentBoard(boardShuffle(2));
        setRevealedBoard(boardList.visibleMedium);
        break;
      }
      case 3: {
        setLives([true, true, true]);
        setCurrentBoard(boardShuffle(3));
        setRevealedBoard(boardList.visibleHard);
        break;
      }
      default: {
        setLives([true, true, true, true, true]);
        setCurrentBoard(boardShuffle(1));
        setRevealedBoard(boardList.visibleEasy);
        break;
      }
    }
    setTimeout(() => {
      hideCards();
    }, 4000);
  };

  useEffect(() => {
    resetGame();
  }, [difficulty || resetGame]);

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(parseInt(event.target.value));
  };

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
      <div className={styles.buttonsContainer}>
        <RoundButton
          value="Reset"
          onClickHandler={() => resetGame()}
        ></RoundButton>
      </div>
    </div>
  );
}
