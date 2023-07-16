import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import historyReducer from './historySlice';

// Main store configuration
export const store = configureStore({
  reducer: {
    search: searchReducer,
    history: historyReducer
  }
});

// Type definitions for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;