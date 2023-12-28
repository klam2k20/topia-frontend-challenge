import Typography from '@material-ui/core/Typography';
import { Stack } from '@mui/material';
import NoVisibleUsers from './NoVisibleUsers';
import VisibleUsers from './VisibleUsers';

/**
 * Displays all visible peer avatars within the user's screen with their id, username,
 * distance from the user, and is broadcaster boolean
 */
export const UserList = ({ users }) => {
  return (
    <Stack aria-label="List of all peers within the user's view" direction='column' spacing={1}>
      <Typography variant='h6' align='left'>
        Visible Users
      </Typography>
      {users.length === 0 && <NoVisibleUsers />}
      {users.length > 0 && <VisibleUsers users={users} />}
    </Stack>
  );
};
