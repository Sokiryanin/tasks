import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TaskForm } from 'components/TaskForm/TaskForm';
import { StyledAddCardBtn } from './Modal.styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ onAdd }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <StyledAddCardBtn onClick={handleOpen}>Add new card</StyledAddCardBtn>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TaskForm onAdd={onAdd} />
        </Box>
      </Modal>
    </div>
  );
}
