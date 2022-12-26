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
const setter = (cards: number[]): number[][] => {
    let maxRows: number;
    let maxCols: number;
    let newBoard = [...boardList.board];
    let counter = 0;
    switch (cards.length){
        default: 
            maxRows = 3
            maxCols = 4
            break;
        case 16:
            maxRows = 4
            maxCols = 4
            break;
        case 20:
            maxRows = 4
            maxCols = 5
            break;
        case 24:
            maxRows = 4
            maxCols = 6
            break;
    }
    for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < maxCols; col++) {
        newBoard[row][col] = cards[counter]
        counter++
      }
    }
    return newBoard;
};

// Function to return a shuffled board based on game difficulty
export const boardShuffle = (difficulty: number): number[][] => {
    switch(difficulty){
        default:{
            let shuffledBoard = setter(cardsShuffle(cardList.easy));
            return shuffledBoard;
        }
        case 2:{
            let shuffledBoard = setter(cardsShuffle(cardList.medium));
            return shuffledBoard;
        }
        case 3:{
            let shuffledBoard = setter(cardsShuffle(cardList.hard));
            return shuffledBoard;
        }
        case 4:{
            let shuffledBoard = setter(cardsShuffle(cardList.hardest));
            return shuffledBoard; 
        }
    }
}