import { Typography } from '@material-ui/core';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { Stack } from '@mui/material';

const NoVisibleUsers = () => {
  return (
    <Stack
      spacing={2}
      direction='column'
      alignItems={'center'}
      aria-label='No peers within the user screen'>
      <NoAccountsIcon fontSize='large' aria-label='No Peers Around Icon' />
      <Typography variant='body1'>No Peers Around</Typography>
    </Stack>
  );
};

export default NoVisibleUsers;
