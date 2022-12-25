// Lists
import { boardList } from "../components/board/board-list/board-list";

// Utils
import { boardShuffle } from "./board-shuffle";

// Object returned by this util
interface IChosenBoard {
    board: number[][];
    visibleBoard: boolean[][];
    invisibleBoard: boolean[][];
    lives: boolean[];
}

// Function to choose the set of board based on difficulty
export const chooseState = (difficulty: number):IChosenBoard => {
    let chosenBoard: IChosenBoard;
    switch (difficulty) {
        default:
            chosenBoard = {
                board: boardShuffle(1),
                visibleBoard : boardList.visibleEasy,
                invisibleBoard : boardList.invisibleEasy,
                lives: [true, true, true, true, true],
            }
            break;
        case 2:
            chosenBoard = {
                board: boardShuffle(2),
                visibleBoard : boardList.visibleEasy,
                invisibleBoard : boardList.invisibleEasy,
                lives: [true, true, true, true],
            }
            break;
        case 3:
            chosenBoard = {
                board: boardShuffle(3),
                visibleBoard : boardList.visibleEasy,
                invisibleBoard : boardList.invisibleEasy,
                lives: [true, true, true],
            }
            break;
    } return chosenBoard;
}