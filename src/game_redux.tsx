import { createStore, Action, Reducer, Dispatch } from "redux";
import { state as INIT_STATE, StateInt, box, BoxInt } from "./utils/state";
import { InitRandomAlgo, MoveAlgo, Move, ResetComAniAlgo } from "./game_algo";

export enum ActionType {
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  InitRandom,
  ResetComAni
}

export interface DispatchActionInt extends Action<ActionType> {
  payload?: Partial<StateInt>;
}

const reducer: Reducer<StateInt, DispatchActionInt> = (
  state = INIT_STATE,
  action
) => {
  switch (action.type) {
    case ActionType.InitRandom:
      return { ...state, boxes: InitRandomAlgo(state.boxes) };
    case ActionType.MoveUp:
      return { ...state, boxes: MoveAlgo(state.boxes, Move.Up) };
    case ActionType.MoveDown:
      return { ...state, boxes: MoveAlgo(state.boxes, Move.Down) };
    case ActionType.MoveLeft:
      return { ...state, boxes: MoveAlgo(state.boxes, Move.Left) };
    case ActionType.MoveRight:
      return { ...state, boxes: MoveAlgo(state.boxes, Move.Right) };
    case ActionType.ResetComAni:
      return { ...state, boxes: ResetComAniAlgo(state.boxes) };
    default:
      return state;
  }
};

export const store = createStore(reducer);

export class Dispatcher {
  private readonly dispatch: Dispatch<DispatchActionInt>;
  constructor(dispatch: Dispatch<DispatchActionInt>) {
    this.dispatch = dispatch;
  }
  initRandom = () => this.dispatch({ type: ActionType.InitRandom });
  moveUp = () => this.dispatch({ type: ActionType.MoveUp });
  moveDown = () => this.dispatch({ type: ActionType.MoveDown });
  moveLeft = () => this.dispatch({ type: ActionType.MoveLeft });
  moveRight = () => this.dispatch({ type: ActionType.MoveRight });
  resetComAni = () => this.dispatch({type: ActionType.ResetComAni});
}
