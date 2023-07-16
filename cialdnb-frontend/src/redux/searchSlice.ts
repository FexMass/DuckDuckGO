import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the state for the search feature
interface SearchState {
  loading: boolean;
  results: { title: string, url: string }[];
  error: string | null;
}

// Initialize the state
const initialState: SearchState = {
  loading: false,
  results: [],
  error: null
};

// Define the SearchResult type used in state and for fetching data
export type SearchResult = { title: string, url: string };

// createAsyncThunk for fetching search results from the server.
// It handles request status (pending, fulfilled, rejected) automatically.
export const getSearchResults = createAsyncThunk<SearchResult[], string>(
  'search/getSearchResults', 
  async (query: string, { rejectWithValue }) => {
    // Validate query length
    if (query.trim().length === 0 || query.length > 100) {
      return rejectWithValue('');
    }
    // Get search results
    const response = await axios.get<SearchResult[]>('http://localhost:3001/search', {
      params: { query },
    });
    return response.data;
  }
);

// Slice for handling search state.
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // reducer to set search results
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    }
  },
  extraReducers: builder => {
    // handle the pending state
    builder.addCase(getSearchResults.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // handle the fulfilled state
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload;
    });
    // handle the rejected state
    builder.addCase(getSearchResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  }
});

// Export the action created by the slice
export const { setResults } = searchSlice.actions;

// Export the reducer for the slice
export default searchSlice.reducer;