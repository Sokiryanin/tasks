import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import BasicModal from 'components/Modal/Modal';

export default function BasicPopover({
  onDeleteCard,
  onDeleteBoard,
  onUpdateCard,
  taskId,
  listId,
  boardId,
  contentType,
  task,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (contentType === 'card') {
      onDeleteCard(boardId, taskId); // Передаем boardId и taskId при удалении карточки
    } else if (contentType === 'list') {
      onDeleteBoard(listId); // Передаем только listId при удалении списка
    }
    handleClose(); // Закрываем всплывающее окно после выполнения операции
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <button aria-describedby={id} variant="contained" onClick={handleClick}>
        ...
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          {contentType === 'card' && (
            <>
              <BasicModal
                onUpdateCard={onUpdateCard}
                contentType="edit"
                taskId={taskId}
                boardId={boardId}
                initialValues={{
                  taskTitle: task.taskTitle,
                  description: task.description,
                  deadline: task.deadline,
                  priority: task.priority,
                }}
              />
              <button onClick={handleDelete}>delete card</button>
            </>
          )}
          {contentType === 'list' && (
            <>
              <button>add new card</button>
              <button onClick={handleDelete}>delete board</button>
            </>
          )}
        </Typography>
      </Popover>
    </div>
  );
}
