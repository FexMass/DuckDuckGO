import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { List, ListItem, ListItemText, Box, ListItemButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SearchResult, setResults } from '../redux/searchSlice';
import { clearHistory, selectQueryKeys } from '../redux/historySlice';
import '../css/sidebar.css'
import { FC } from 'react';

// Styles for the container
const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginBottom: theme.spacing(2)
}))

// Styles for the header
const Header = styled('span')(({ theme }) => ({
  fontSize: '1.2em',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderBottom: `2px solid ${theme.palette.divider}`,
}))

// Type for the component props
type SearchHistoryProps = {
  setQuery: (value: string) => void
  setHasSearched: (value: boolean) => void
}

export const SearchHistory: FC<SearchHistoryProps> = ({ setQuery, setHasSearched }) => {
  // Hooks for dispatching actions and selecting Redux state
  const dispatch = useDispatch<AppDispatch>()
  const queries = useSelector(selectQueryKeys)
  const queriesData = useSelector((state: RootState) => state.history.queries)

  // Function for handling a click on a history item
  const handleClick = (query: string) => {
    const cachedResults = queriesData[query] as SearchResult[]
    dispatch(setResults(cachedResults)) // Update the search results with cached results
    setQuery(query) // Update the current search query
    setHasSearched(true) // Indicate that a search has been performed
  }

  // Render the component
  return (
    <StyledBox>
      <List>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Header>Search History</Header>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(clearHistory())}
          >
            Clear History
          </Button>
        </div>
        {queries.map((query, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => handleClick(query)}>
              <ListItemText primary={query} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledBox>
  )
}