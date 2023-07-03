import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface Login {
  id: string;
  name: string;
}
const initialState: Array<Login> = []

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Login>) => {
      if (action.payload.name !== "" && state.length < 2) {
        state.push(action.payload);
      }
    },
    reset: () => initialState
  },
});

export const { addUser, reset } = loginSlice.actions;
export const userSelector = (state: RootState) => state.persistedReducer.login;
export default loginSlice.reducer;