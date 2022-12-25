// Const
import { boardList } from "../components/board/board-list/board-list";
import { cardList } from "../components/card/card-list/card-list";

// Function to shuffle card list
const cardsShuffle = (selectedCards: number[]): number[] => {
    let cards = [...selectedCards, ...selectedCards];

    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }

    return cards;
}

// Function to set the card values in a board
const setter = (cards: number[], board: number[][]): number[][] => {
    let rows = board.length;
    let columns = board[0].length
    let counter = 0;
    let newBoard = [...board];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        newBoard[row][col] = cards[counter];
        counter++;
      }
    }
    return newBoard;
};

// Function to return a shuffled board based on game difficulty
export const boardShuffle = (difficulty: number): number[][] => {
    switch(difficulty){
        case 2:{
            let shuffledBoard = setter(cardsShuffle(cardList.medium), boardList.medium);
            return shuffledBoard;
        }
        case 3:{
            let shuffledBoard = setter(cardsShuffle(cardList.hard), boardList.hard);
            return shuffledBoard;
        }
        default:{
            let shuffledBoard = setter(cardsShuffle(cardList.easy), boardList.easy);
            return shuffledBoard;
        }
    }
}