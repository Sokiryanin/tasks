import BasicPopover from 'components/EditBtn/EditBtn';

export const TaskCard = ({
  task: { id, name, description, date, level },
  onDeleteCard,
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between ' }}>
        <h3>{name}</h3>
        <BasicPopover
          contentType="card"
          onDeleteCard={onDeleteCard}
          taskId={id}
        />
      </div>
      <div>
        <p>{description}</p>
        <p>{date}</p>
        <p>{level}</p>
      </div>
    </div>
  );
};
