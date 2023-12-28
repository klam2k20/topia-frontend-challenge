import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import { useState } from 'react';
import { useUserInfo } from '../context/UserInfoProvider';
import listUsersInView from '../utils/listUsersInView';

/**
 * A form to update the user's position and screen
 */
const UpdateForm = ({ handleClose, updateVisibleUsers }) => {
  const { position, screenSize, updateUserPosition, updateScreenSize } = useUserInfo();
  const [formValues, setFormValues] = useState({
    xPosition: {
      value: position.x,
      error: false,
      errorCondition: (val) => val === '',
      errorMessage: 'Please specify a X coordinate for your avatar',
    },
    yPosition: {
      value: position.y,
      error: false,
      errorCondition: (val) => val === '',
      errorMessage: 'Please specify a Y coordinate for your avatar',
    },
    screenWidth: {
      value: screenSize.width,
      error: false,
      errorCondition: (val) => val === '' || 0 > +val,
      errorMessage: 'Screen width must be a positive number',
    },
    screenHeight: {
      value: screenSize.height,
      error: false,
      errorCondition: (val) => val === '' || 0 > +val,
      errorMessage: 'Screen height must be a positive number',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value: value,
        error: formValues[name]['errorCondition'](value),
      },
    });
  };

  /**
   * Updates the user's position and screen size in the UserInfoProvider
   * and updates the list of visible peer avatars
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserPosition({ x: +formValues.xPosition.value, y: +formValues.yPosition.value });
    updateScreenSize({
      width: +formValues.screenWidth.value,
      height: +formValues.screenHeight.value,
    });
    const visibleUsers = listUsersInView(
      +formValues.xPosition.value,
      +formValues.yPosition.value,
      +formValues.screenWidth.value,
      +formValues.screenHeight.value
    );
    updateVisibleUsers(visibleUsers);
    handleClose();
  };

  return (
    <>
      <DialogTitle>Update View</DialogTitle>

      <DialogContent>
        <form aria-label='Update User View Modal'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                autoFocus
                fullWidth
                aria-label='X Position'
                id='xPosition'
                name='xPosition'
                label='X Position'
                type='number'
                value={formValues.xPosition.value}
                error={formValues.xPosition.error}
                helperText={formValues.xPosition.error && formValues.xPosition.errorMessage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                aria-label='Y Position'
                id='yPosition'
                name='yPosition'
                label='Y Position'
                type='number'
                value={formValues.yPosition.value}
                error={formValues.yPosition.error}
                helperText={formValues.yPosition.error && formValues.yPosition.errorMessage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                aria-label='Screen Width'
                id='screenWidth'
                name='screenWidth'
                label='Screen Width'
                type='number'
                value={formValues.screenWidth.value}
                error={formValues.screenWidth.error}
                helperText={formValues.screenWidth.error && formValues.screenWidth.errorMessage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                aria-label='Screen Height'
                id='screenHeight'
                name='screenHeight'
                label='Screen Height'
                type='number'
                value={formValues.screenHeight.value}
                error={formValues.screenHeight.error}
                helperText={formValues.screenHeight.error && formValues.screenHeight.errorMessage}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button aria-label='Cancel' variant='contained' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          aria-label='Update'
          variant='contained'
          style={{ background: 'black', color: 'white' }}
          onClick={handleSubmit}
          disabled={
            formValues.xPosition.error ||
            formValues.yPosition.error ||
            formValues.screenWidth.error ||
            formValues.screenHeight.error
          }>
          Update
        </Button>
      </DialogActions>
    </>
  );
};

export default UpdateForm;
