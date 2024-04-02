export const TaskCard = ({ task: { name, description, date, level } }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between ' }}>
        <h3>{name}</h3>
        <button type="button">...</button>
      </div>
      <div>
        <p>{description}</p>
        <p>{date}</p>
        <p>{level}</p>
      </div>
    </div>
  );
};
