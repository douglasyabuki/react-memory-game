// Const
import { boardList } from "../components/board/board-list/board-list";

// Interface
import { IState } from "../interfaces/State";

// Utils
import { boardShuffle } from "./board-shuffle";

const chooseLives = (difficulty: number): boolean[] => {
    switch (difficulty) {
        default:
            return [true, true, true, true, true];
        case 2:
            return [true, true, true, true];
        case 3:
            return [true, true, true];
        case 4:
            return [true, true, true];
    }
}

export const chooseState = (difficulty: number): IState => {
    const chosenState: IState = {
        difficulty: difficulty,
        currentBoard: boardShuffle(difficulty),
        revealedBoard: boardList.visible,
        lives: chooseLives(difficulty),
        firstCard: undefined,
        isComparing: false,
        gameOver: '',
        levelChangeDisabled: true,
    }

    return chosenState;
}