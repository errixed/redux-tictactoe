import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Cell = 'X' | 'O' | '-'
export type Table = Array<Array<Cell>>
export type Turn = Exclude<Cell, '-'>

export interface State {
  table: Table
  turn: Turn
  gameStatus: string
  nameX: string,
  nameO: string,
}

const initialState: State = {
  table: [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ],
  turn: "X",
  gameStatus: "choose a box to start",
  nameO: '',
  nameX: '',
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
      if (state.table[action.payload.i][action.payload.j] === '-') {
        state.table[action.payload.i][action.payload.j] = state.turn
        state.turn = state.turn === 'O' ? 'X' : 'O'
      }
    },
    gameStatus: (state, action: PayloadAction<GameStatusAction>) => {
      state.gameStatus = action.payload.message
    },
    undo: (state, action: PayloadAction<Table>) => {
      state.table = action.payload
      state.turn = state.turn === 'O' ? 'X' : 'O'
    },
    reset: (state) => {
      state.table = initialState.table
      state.turn = initialState.turn
      state.gameStatus = initialState.gameStatus
    },
    setUser: (state, action: PayloadAction<{name: string, role: Turn}>) => {
      if (action.payload.role === 'O') {
        state.nameO = action.payload.name
      }
      if (action.payload.role === 'X') {
        state.nameX = action.payload.name
      }
    }
  },
});

const calculateWinner = (squares: Cell[]) => {
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

export const selectSquares = (state: RootState) => state.persistedReducer.ticTacToe.table

export const selectWinner = createSelector(
  selectSquares,
  (squares) => {
    const squaresArray = squares.flat();
    return calculateWinner(squaresArray);
  }
);

export const { turn, reset, gameStatus, undo, setUser } = tictactoeSlice.actions;
export const stateSelector = (state: RootState) => state.persistedReducer.ticTacToe;
export default tictactoeSlice.reducer;