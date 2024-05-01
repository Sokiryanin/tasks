import BasicPopover from 'components/EditBtn/EditBtn';

export const TaskCard = ({
  task: { _id, taskTitle, description, deadline, priority },
  boardId,
  onDeleteCard,
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between ' }}>
        <h3>{taskTitle}</h3>
        <BasicPopover
          contentType="card"
          onDeleteCard={onDeleteCard}
          taskId={_id}
          boardId={boardId}
        />
      </div>
      <div>
        <p>{description}</p>
        <p>{deadline}</p>
        <p>{priority}</p>
      </div>
    </div>
  );
};
