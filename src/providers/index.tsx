import { CssBaseline, ThemeProvider } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { theme } from 'theme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Query } from './Query';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Providers = () => {
  return (
    <Query>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Outlet />
          <Toaster position="top-center" />
        </ThemeProvider>
      </LocalizationProvider>
      <ReactQueryDevtools />
    </Query>
  );
};
