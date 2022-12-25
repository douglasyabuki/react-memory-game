// Hooks
import produce from "immer";

// Utils
import { chooseState } from "../../../utils/choose-state";

const initialDifficulty = 1;
const initialBoard = chooseState(initialDifficulty);

export const initialState = {
  difficulty: initialDifficulty,
  currentBoard: initialBoard.board,
  revealedBoard: initialBoard.visibleBoard,
  lives: initialBoard.lives,
  firstCard: undefined,
  isComparing: false,
  gameOver: "",
  reRender: false,
};

type State = typeof initialState;

export enum ActionType {
  SET_CURRENT_BOARD = "SET_CURRENT_BOARD",
  SET_DIFFICULTY = "SET_DIFFICULTY",
  SET_FIRST_CARD = "SET_FIRST_CARD",
  SET_GAME_OVER = "SET_GAME_OVER",
  SET_LIVES = "SET_LIVES",
  SET_REVEALED_BOARD = "SET_REVEALED_BOARD",
  SET_IS_COMPARING = "SET_IS_COMPARING",
  SET_RE_RENDER = "SET_RE_RENDER"
}

interface Action {
  type: ActionType;
  payload?: any;
}

export const reducer = (state: State, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
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
      case ActionType.SET_RE_RENDER:
        draft.reRender= action.payload;
        break;
    }
  });