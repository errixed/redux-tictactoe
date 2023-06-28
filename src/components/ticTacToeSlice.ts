import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type Cell = 'X' | 'O' | '-'
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

export interface TurnAction {
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

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const selectSquares = (state: RootState) => state.tactactoeReducer.table

export const selectWinner = createSelector(
  selectSquares,
  (squares) => {
    const squaresArray = squares.flat();
    return calculateWinner(squaresArray);
  }
);

export const { turn } = tactactoeSlice.actions;
export const turnSelector = (state: RootState) => state.tactactoeReducer;
export default tactactoeSlice.reducer;