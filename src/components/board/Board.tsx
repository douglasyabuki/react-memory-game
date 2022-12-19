// Components
import Card from "../cards/Card";

// Hooks
import { useState } from "react";

// CSS
import styles from "./Board.module.css";
import RoundButton from "../round-button/RoundButton";

const myCards: number[] = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

const myBoard: number[][] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const hiddenBoard: boolean[][] = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];

const cardsShuffle = (): number[][] => {
  let cards = myCards;
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
  const [revealedBoard, setRevealedBoard] = useState<boolean[][]>(hiddenBoard);

  const onClickHandler = () => {};

  const revealCards = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if ((revealedBoard[row][col] = true)) {
        }
      }
    }
  };

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        {currentBoard.map((row, rowId) => (
          <div className={styles.row} key={rowId}>
            {row.map((card, colId) => (
              <div className={styles.card} key={colId}>
                <Card value={card} onClickHandler={onClickHandler}></Card>
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
