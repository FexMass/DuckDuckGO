import { useState } from 'react';
import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import { SearchHistory } from './SearchHistory';
import { ErrorAlert } from './ErrorAlert';

// Main component which includes the search form, results, history and error alert
export const Startup = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-1">
        <SearchHistory setQuery={setQuery} setHasSearched={setHasSearched} />
      </div>
      <div className="col-span-3">
        <SearchForm setHasSearched={setHasSearched} query={query} setQuery={setQuery} />
        <ErrorAlert />
        <SearchResults hasSearched={hasSearched} />
      </div>
    </div>
  );
};