import { Box, Button } from '@material-ui/core';

const UpdateViewBtn = ({ onClick }) => {
  return (
    <Box mt={2}>
      <Button
        aria-label='Open update user view modal'
        variant='contained'
        style={{ background: 'black', color: 'white' }}
        onClick={onClick}
        fullWidth>
        Update User View
      </Button>
    </Box>
  );
};

export default UpdateViewBtn;
