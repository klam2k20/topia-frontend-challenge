import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import CellTowerIcon from '@mui/icons-material/CellTower';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const VisibleUsers = ({ users }) => {
  return (
    <TableContainer>
      <Table aria-label='Visible peers within the user screen'>
        <TableHead style={{ backgroundColor: 'black' }}>
          <TableRow>
            <TableCell>
              <Typography variant='body1' className='white-text'>
                ID
              </Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant='body1' className='white-text'>
                Username
              </Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant='body1' className='white-text'>
                Distance (px)
              </Typography>
            </TableCell>
            <TableCell align='center'>
              <Typography variant='body1' className='white-text'>
                Is Broadcaster
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id} aria-label={`${u.username} is ${u.distance} from user positon`}>
              <TableCell>
                <Typography variant='body1'>{u.id}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>{u.username}</Typography>
              </TableCell>
              <TableCell align='center' aria-label='distance'>
                <Typography variant='body1'> {u.distance}</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>
                  {u.isBroadcaster ? (
                    <CellTowerIcon fontSize='small' />
                  ) : (
                    <NotInterestedIcon fontSize='small' />
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisibleUsers;
