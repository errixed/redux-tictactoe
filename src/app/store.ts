import { configureStore } from '@reduxjs/toolkit';
import tactactoeReducer from '../components/ticTacToeSlice';

export const store = configureStore({
  reducer: {
    tactactoeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;