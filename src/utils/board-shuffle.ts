import { cardList } from "../components/card/card-list/card-list";
import { boardList } from "../components/board/board-list/board-list";

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

const shuffler = (cards: number[], board: number[][]): number[][] => {
    const rows = board.length;
    const columns = board[0].length;
    let counter = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        board[row][col] = cards[counter];
        counter++;
      }
    }
    return board;
};

export const boardShuffle = (difficulty: number): number[][] => {
    switch(difficulty){
        case 2:{
            let shuffledBoard = shuffler(cardsShuffle(cardList.medium), boardList.medium);
            return shuffledBoard;
        }
        case 3:{
            let shuffledBoard = shuffler(cardsShuffle(cardList.hard), boardList.hard);
            return shuffledBoard;
        }
        default:{
            let shuffledBoard = shuffler(cardsShuffle(cardList.easy), boardList.easy);
            return shuffledBoard;
        }
    }
}