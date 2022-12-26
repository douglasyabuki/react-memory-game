// Game state interface
export interface IState {
    difficulty: number;
    currentBoard: number[][];
    revealedBoard: boolean[][];
    lives: boolean[];
    firstCard: number[] | undefined;
    isComparing: boolean;
    gameOver: string;
    levelChangeDisabled: boolean;
}