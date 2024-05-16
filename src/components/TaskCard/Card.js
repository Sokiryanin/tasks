import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BasicPopover from 'components/EditBtn/EditBtn';
import { Link, useLocation } from 'react-router-dom';

export default function BasicCard({
  task: { _id, taskTitle, description, deadline, priority },
  boardId,
  onDeleteCard,
  onUpdateCard,
}) {
  const location = useLocation();

  return (
    <Card sx={{ width: '100%', backgroundColor: 'rgb(239, 239, 239)' }}>
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
            display: 'flex',
            justifyContent: 'space-between ',
          }}
          component="div"
        >
          <Link
            to={`/boards/${boardId}/tasks/${_id}`}
            state={{ from: location }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 17,
                lineHeight: 1.17,
              }}
              component="h2"
            >
              {' '}
              {taskTitle}
            </Typography>
          </Link>

          <BasicPopover
            contentType="card"
            onDeleteCard={onDeleteCard}
            taskId={_id}
            boardId={boardId}
            onUpdateCard={onUpdateCard}
            task={{ _id, taskTitle, description, deadline, priority }}
          />
        </Typography>
        <Typography component="div">
          <Typography component="p">{description}</Typography>
          <Typography component="p">{deadline}</Typography>
          <Typography component="p">{priority}</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
