import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from '@mui/material';
import { useUserInfo } from '../context/UserInfoProvider';

/**
 * Displays the user's initial position and screen dimensions
 */
const UserInfo = () => {
  const { position, screenSize } = useUserInfo();
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        aria-label='User position and screen dimensions'
        expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' align='left'>
          User's Information
        </Typography>
      </AccordionSummary>
      <AccordionDetails className='flex-col'>
        <Stack spacing={2} direction='column'>
          <Stack
            aria-label='User position'
            direction='row'
            justifyContent={'space-between'}
            flexWrap={'wrap'}>
            <Typography variant='body1'>Position:</Typography>
            <Typography variant='body1'>{`(${position.x}, ${position.y})`}</Typography>
          </Stack>
          <Stack
            aria-label='User screen dimensions'
            direction='row'
            justifyContent={'space-between'}
            flexWrap={'wrap'}>
            <Typography variant='body1'>Screen Size:</Typography>
            <Typography variant='body1'>{`${screenSize.width} x ${screenSize.height}`}</Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserInfo;
