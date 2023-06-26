import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// export interface Todo {
//   id: string;
//   title: string;
//   description: string;
// }

export type Cell = 'X' | 'O' | '-'
export type Table = Array<Array<Cell>>
export type Turn = Exclude<Cell, '-'>

export interface State {
  table: Table
  turn: Turn
}

const initialState: State = {
  table: [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ],
  turn: "X"
}

interface TurnAction {
  i: number,
  j: number,
}

export const tactactoeSlice = createSlice({
  name: "tactactoe",
  initialState,
  reducers: {
    turn: (state, action: PayloadAction<TurnAction>) => {
        state.table[action.payload.i][action.payload.j] = state.turn
        state.turn = state.turn == 'O' ? 'X' : 'O'
    }
  },
});

export const { turn } = tactactoeSlice.actions;
export const turnSelector = (state: RootState) => state.tactactoeReducer;
export default tactactoeSlice.reducer;