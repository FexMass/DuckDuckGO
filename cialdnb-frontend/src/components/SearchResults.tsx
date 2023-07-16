import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CardContent, Link, Card, Box, Typography, styled  } from '@mui/material';
import '../css/searchResults.css'

// Styled components for consistent UI design
const ResultCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ResultLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

// Define the props for this component
type HasSearched = {
  hasSearched: boolean
}

// The SearchResults component
export const SearchResults: FC<HasSearched> = ({ hasSearched }) => {
  // States to handle pagination
  const [displayedResults, setDisplayedResults] = useState<{title: string, url: string}[]>([]);
  const [page, setPage] = useState(1);

  // Fetch results from the Redux store
  const results = useSelector((state: RootState) => state.search.results);

  const ITEMS_PER_PAGE = 10;

  // Slice the results to the number of items per page on first render or when the results change
  useEffect(() => {
    setDisplayedResults(results.slice(0, ITEMS_PER_PAGE));
  }, [results]);

  // Handle scroll event
  const handleScroll = (event: React.UIEvent) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    // If we reach the bottom of the box, increment the page number
    if (scrollHeight - scrollTop === clientHeight) {
      setPage(prevPage => prevPage + 1);
    }
  }

  // Update the displayed results when the page number changes
  useEffect(() => {
    if (results.length && page > 1) {
      setDisplayedResults(prevResults => [
        ...prevResults,
        ...results.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
      ]);
    }
  }, [page, results]);

  // If no search has been made, return null
  if (!hasSearched) {
    return null;
  }

  return (
    <Box onScroll={handleScroll} sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 5, maxHeight: '80vh', overflow: 'auto' }}>
      {displayedResults.length > 0 ? (
        displayedResults.map((result, index) => (
          <ResultCard key={index}>
            <CardContent>
              <Typography variant="h5" component="div">
                <ResultLink href={result.url} target="_blank" rel="noopener">{result.title}</ResultLink>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {result.url}
              </Typography>
            </CardContent>
          </ResultCard>
        ))
      ) : (
        <Typography variant="body1">No results found</Typography>
      )}
    </Box>
  );
};