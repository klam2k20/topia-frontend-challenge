import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoVisibleUsers from './NoVisibleUsers';
import VisibleUsers from './VisibleUsers';

/**
 * Displays all visible peer avatars within the user's screen with their id, username,
 * distance from the user, and is broadcaster boolean
 */
export const UserList = ({ users }) => {
  return (
    <Accordion defaultExpanded={true} aria-label="List of all peers within the user's viewport">
      <AccordionSummary
        aria-label='Visible peer avatars within the user screen'
        expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' align='left'>
          Visible Users
        </Typography>
      </AccordionSummary>
      <AccordionDetails className='flex-col'>
        {users.length === 0 && <NoVisibleUsers />}
        {users.length > 0 && <VisibleUsers users={users} />}
      </AccordionDetails>
    </Accordion>
  );
};
