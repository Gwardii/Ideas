import { Box } from '@mui/material';
import { CreateBaseForm } from './CreateBaseForm';
import { AppBar } from 'components/AppBar';

export const Home = () => {

  return (
    <Box
      flex={1}
      width="100%"
      maxWidth="2400px"
      mx="auto"
      p="32px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="24px"
    >
      <AppBar />
      <CreateBaseForm />
    </Box>
  );
};
