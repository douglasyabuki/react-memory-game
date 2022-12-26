// Hooks
import produce from "immer";

// Utils
import { boardList } from "../board-list/board-list";
import { chooseState } from "../../../utils/choose-state";

export const initialState = {
  difficulty: 1,
  currentBoard: boardList.board,
  revealedBoard: boardList.visible,
  lives: [true, true, true, true, true],
  firstCard: undefined,
  isComparing: false,
  gameOver: "",
};

type State = {
  difficulty: number;
  currentBoard: number[][];
  revealedBoard: boolean[][];
  lives: boolean[];
  firstCard: undefined;
  isComparing: boolean;
  gameOver: string;
}

export enum ActionType {
  SET_DIFFICULTY = "SET_DIFFICULTY",
  SET_CURRENT_BOARD = "SET_CURRENT_BOARD",
  SET_REVEALED_BOARD = "SET_REVEALED_BOARD",
  SET_LIVES = "SET_LIVES",
  SET_FIRST_CARD = "SET_FIRST_CARD",
  SET_IS_COMPARING = "SET_IS_COMPARING",
  SET_GAME_OVER = "SET_GAME_OVER",
  SET_NEW_GAME = "SET_NEW_GAME"
}

interface Action {
  type: ActionType;
  payload?: any;
}

export const reducer = (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
      case ActionType.SET_CURRENT_BOARD:
        draft.currentBoard = action.payload;
        break;
      case ActionType.SET_DIFFICULTY:
        draft.difficulty = action.payload;
        break;
      case ActionType.SET_FIRST_CARD:
        draft.firstCard = action.payload;
        break;
      case ActionType.SET_GAME_OVER:
        draft.gameOver = action.payload;
        break;
      case ActionType.SET_LIVES:
        draft.lives = action.payload;
        break;
      case ActionType.SET_REVEALED_BOARD:
        draft.revealedBoard = action.payload;
        break;
      case ActionType.SET_IS_COMPARING:
        draft.isComparing = action.payload;
        break;
      case ActionType.SET_NEW_GAME:
        const payload = action.payload;
        draft.difficulty = payload.difficulty;
        draft.currentBoard = payload.currentBoard;
        draft.revealedBoard = payload.revealedBoard;
        draft.lives = payload.lives;
        draft.isComparing = payload.isComparing;
        draft.gameOver = payload.gameOver;
        break;
    }
  });