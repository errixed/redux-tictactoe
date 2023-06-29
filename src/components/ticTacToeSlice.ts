import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type Cell = 'X' | 'O' | '-'
type Table = Array<Array<Cell>>
type Turn = Exclude<Cell, '-'>

export interface State {
  table: Table
  turn: Turn
  gameStatus: string
}

const initialState: State = {
  table: [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ],
  turn: "X",
  gameStatus: "choose a box to start"
}

interface TurnAction {
  i: number,
  j: number,
}

interface GameStatusAction {
  message: string
}

export const tictactoeSlice = createSlice({
  name: "tactactoe",
  initialState,
  reducers: {
    turn: (state, action: PayloadAction<TurnAction>) => {
      state.table[action.payload.i][action.payload.j] = state.turn
      state.turn = state.turn == 'O' ? 'X' : 'O'
    },
    setGameStatus: (state, action: PayloadAction<GameStatusAction>) => {
      state.gameStatus = action.payload.message
    },
    reset: () => initialState
  },
});

function calculateWinner(squares: Cell[]) {
  const lines = [
  // a, b, c 
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
    if (squares[a] !== '-' && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const selectSquares = (state: RootState) => state.persistedReducer.table

export const selectWinner = createSelector(
  selectSquares,
  (squares) => {
    const squaresArray = squares.flat();
    return calculateWinner(squaresArray);
  }
);

export const { turn, reset, setGameStatus } = tictactoeSlice.actions;
export const turnSelector = (state: RootState) => state.persistedReducer;
export default tictactoeSlice.reducer;