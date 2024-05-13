import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TaskForm } from 'components/TaskForm/TaskForm';
import { StyledAddCardBtn } from './Modal.styled';
import { UpdateTaskForm } from 'components/UpdateTaskForm/UpdateTaskForm';

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

export default function BasicModal({
  onAdd,
  id,
  contentType,
  boardId,
  taskId,
  onUpdateCard,
  initialValues,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let modalContent;
  const editCont = contentType === 'edit';
  const addCont = contentType === 'add';

  if (addCont) {
    modalContent = (
      <TaskForm
        onAdd={onAdd}
        listId={id}
        onCloseModal={handleClose}
        isModal={true}
      />
    );
  } else if (editCont) {
    modalContent = (
      <UpdateTaskForm
        onUpdateCard={onUpdateCard}
        boardId={boardId}
        taskId={taskId}
        onCloseModal={handleClose}
        initialValues={initialValues}
      />
    );
  }

  return (
    <>
      {addCont && (
        <StyledAddCardBtn onClick={handleOpen}>Add new card</StyledAddCardBtn>
      )}
      {editCont && <button onClick={handleOpen}>edit</button>}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>{modalContent}</Box>
      </Modal>
    </>
  );
}
