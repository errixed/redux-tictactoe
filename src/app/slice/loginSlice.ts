import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Turn } from "./ticTacToeSlice";
export interface Login {
  name: string;
  role: Turn
}
const initialState: LoginState = {
  playerX: undefined,
  playerO: undefined
}

interface LoginState {
  playerX?: string,
  playerO?: string,
}

// createReducer(initialState, )

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Login>) => {
      if (action.payload.role === "X") {
        // state.playerX = action.payload.name
        return {
          playerX: action.payload.name,
          playerO: state.playerO,
        }
      } else {
        return {
          playerO: action.payload.name,
          playerX: state.playerX,
        }
      }
    },
    reset: () => initialState
  },
});

export const selectReady = (state: RootState) => state.persistedReducer.login

export const isReady = createSelector(
  selectReady,
  (state) => state.playerX !== undefined && state.playerO !== undefined //return boolean
    // console.log('state', state.playerO, state.playerX)

);

export const { addUser, reset } = loginSlice.actions;
export const userSelector = (state: RootState) => state.persistedReducer.login;
export default loginSlice.reducer;