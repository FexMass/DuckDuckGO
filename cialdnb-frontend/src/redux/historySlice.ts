import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

interface HistoryState {
  queries: {
    [query: string]: unknown
  }
}

// Load the initial state from local storage if it exists
const loadInitialState = (): HistoryState => {
  const persistedState = localStorage.getItem('historyState')
  return persistedState ? JSON.parse(persistedState) as HistoryState : { queries: {} }
}

// Initial state of the history slice
const initialState: HistoryState = loadInitialState();

// Slice for handling search history
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // Add a query and its result to the history
    addQuery: (state, action: PayloadAction<{ query: string, result: unknown }>) => {
      state.queries[action.payload.query] = action.payload.result;
      localStorage.setItem('historyState', JSON.stringify(state));
    },
    // Clear the history
    clearHistory: (state) => {
      state.queries = {};
      localStorage.removeItem('historyState');
    },
  },
});

// Selectors for retrieving data from the history slice
const selectQueries = (state: RootState) => state.history.queries;

export const selectQueryKeys = createSelector(
  [selectQueries],
  (queries) => Object.keys(queries)
);

export const { addQuery, clearHistory } = historySlice.actions; 

export default historySlice.reducer;