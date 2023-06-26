import { configureStore } from '@reduxjs/toolkit';
import tactactoeReducer from '../components/todoSlice';

export const store = configureStore({
  reducer: {
    tactactoeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;