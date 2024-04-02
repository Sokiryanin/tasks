export const TaskCard = ({ task: { name, description, date, level } }) => {
  return (
    <div>
      <div>
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
