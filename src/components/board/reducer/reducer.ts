// Hooks
import produce from "immer";

// Utils
import { chooseState } from "../../../utils/choose-state";

const chosenInitialState = chooseState(1);

export const initialState = {
  difficulty: chosenInitialState.difficulty,
  currentBoard: chosenInitialState.currentBoard,
  revealedBoard: chosenInitialState.revealedBoard,
  lives: chosenInitialState.lives,
  firstCard: chosenInitialState.firstCard,
  isComparing: chosenInitialState.isComparing,
  gameOver: chosenInitialState.gameOver,
  levelChangeDisabled: chosenInitialState.levelChangeDisabled
};

type State = {
  difficulty: number;
  currentBoard: number[][];
  revealedBoard: boolean[][];
  lives: boolean[];
  firstCard: undefined | number[];
  isComparing: boolean;
  gameOver: string;
  levelChangeDisabled: boolean;
}

export enum ActionType {
  SET_DIFFICULTY = "SET_DIFFICULTY",
  SET_CURRENT_BOARD = "SET_CURRENT_BOARD",
  SET_REVEALED_BOARD = "SET_REVEALED_BOARD",
  SET_LIVES = "SET_LIVES",
  SET_FIRST_CARD = "SET_FIRST_CARD",
  SET_IS_COMPARING = "SET_IS_COMPARING",
  SET_GAME_OVER = "SET_GAME_OVER",
  SET_NEW_GAME = "SET_NEW_GAME",
  SET_LEVEL_CHANGE_DISABLED = "SET_LEVEL_CHANGE_DISABLED"
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
        const { difficulty } = action.payload;
        return produce(state, draft => {
          draft.difficulty = difficulty;
          let newState = chooseState(difficulty)
          draft.currentBoard = newState.currentBoard;
          draft.revealedBoard = newState.revealedBoard;
          draft.lives = newState.lives;
          draft.isComparing = newState.isComparing;
          draft.gameOver = newState.gameOver
          draft.levelChangeDisabled = newState.levelChangeDisabled;
        })
      case ActionType.SET_LEVEL_CHANGE_DISABLED:
        draft.levelChangeDisabled = action.payload;
        break;
    }
  });