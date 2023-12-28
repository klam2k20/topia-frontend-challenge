import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Stack } from '@mui/material';
import { useUserInfo } from '../context/UserInfoProvider';

/**
 * Displays the user's initial position and screen dimensions
 */
const UserInfo = () => {
  const { position, screenSize } = useUserInfo();
  return (
    <Stack aria-label='User position and screen dimensions' direction='column'>
      <Typography variant='h6' align='left'>
        User's Information
      </Typography>
      <TableContainer>
        <Table aria-label='User position and screen dimensions'>
          <TableHead style={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell>
                <Typography variant='body1' className='white-text'>
                  X Position
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1' className='white-text'>
                  Y Position
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1' className='white-text'>
                  Screen Width (px)
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1' className='white-text'>
                  Screen Height (px)
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant='body1'>{position.x}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>{position.y}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>{screenSize.width}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>{screenSize.height}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default UserInfo;
