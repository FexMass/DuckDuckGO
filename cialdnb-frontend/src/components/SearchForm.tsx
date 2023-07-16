import React, { FC } from 'react';
import { Button, TextField, Box, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getSearchResults } from '../redux/searchSlice';
import { addQuery } from '../redux/historySlice';
import { AppDispatch } from '../redux/store';

// Styled components for consistent UI design
const FormButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
}))

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(1),
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
  },
}))

// Define the props for this component
type Searched = {
  setHasSearched: (value: boolean) => void
  setQuery: (value: string) => void
  query: string
}

// The SearchForm component
export const SearchForm: FC<Searched> = ({ setHasSearched, setQuery, query }) => {
  const dispatch = useDispatch<AppDispatch>()

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // Dispatch the action to get search results
    dispatch(getSearchResults(query))
      .then((resultAction) => {
        // If the action is fulfilled, dispatch the action to add the query to the history
        if (getSearchResults.fulfilled.match(resultAction)) {
          dispatch(addQuery({ query: query, result: resultAction.payload }))
          // Set hasSearched to true
          setHasSearched(true)
        }
      })
      .catch((error) => {
        console.error("Failed to search:", error)
      })
    // Clear the input field
    setQuery('')
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 2, marginBottom: 2 }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
        <SearchField
          fullWidth
          label="Search"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FormButton variant="contained" color="primary" type="submit">
          Search
        </FormButton>
      </form>
    </Box>
  );
};