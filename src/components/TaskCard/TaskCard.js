import BasicPopover from 'components/EditBtn/EditBtn';

export const TaskCard = ({
  task: { _id, taskTitle, description, deadline, priority },
  onDeleteCard,
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between ' }}>
        <h3>{taskTitle}</h3>
        <BasicPopover
          contentType="card"
          // onDeleteCard={onDeleteCard}
          taskId={_id}
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
