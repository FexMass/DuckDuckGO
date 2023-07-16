import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Alert } from '@mui/material';

export const ErrorAlert = () => {
  const error = useSelector((state: RootState) => state.search.error);

  return (
    <>
      {error && (
        <Alert severity="error" className="my-4">
          {error}
        </Alert>
      )}
    </>
  );
};