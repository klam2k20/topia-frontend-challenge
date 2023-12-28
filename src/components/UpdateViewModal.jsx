import { Dialog } from '@material-ui/core';
import { useState } from 'react';
import UpdateForm from './UpdateForm';
import UpdateViewBtn from './UpdateViewBtn';

const UpdateViewModal = ({ updateVisibleUsers }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <UpdateViewBtn onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose}>
        <UpdateForm handleClose={handleClose} updateVisibleUsers={updateVisibleUsers} />
      </Dialog>
    </>
  );
};

export default UpdateViewModal;
