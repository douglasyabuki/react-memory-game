// Components
import Card from "../cards/Card";

// Hooks
import { useState } from "react";

// CSS
import styles from "./Board.module.css";
import RoundButton from "../round-button/RoundButton";

const myCards: number[] = [1, 2, 3, 4, 5, 6];

const myBoard: number[][] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const cardsShuffle = (): number[][] => {
  let cards = [...myCards, ...myCards];
  let board = myBoard;
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
  let counter = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      board[row][col] = cards[counter];
      counter++;
    }
  }
  return board;
};

export default function Board() {
  const [currentBoard, setCurrentBoard] = useState<number[][]>(cardsShuffle);
  const [firstCard, setFirstCard] = useState<number[] | undefined>();
  const [revealedBoard, setRevealedBoard] = useState<boolean[][]>(
    new Array(currentBoard.length)
      .fill("")
      .map(() => new Array(currentBoard[0].length).fill(false))
  );

  const onClickHandler = (rowId: number, colId: number) => {
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
        hideCards(rowId, colId);
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

  const hideCards = (row: number, col: number): void => {
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

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        {currentBoard.map((row, rowId) => (
          <div className={styles.row} key={rowId}>
            {row.map((card, colId) => (
              <div className={styles.card} key={colId}>
                <Card
                  value={card}
                  onClickHandler={() => onClickHandler(rowId, colId)}
                  isVisible={revealedBoard[rowId][colId]}
                ></Card>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        {/* <RoundButton value="Play again"></RoundButton> */}
      </div>
    </div>
  );
}
