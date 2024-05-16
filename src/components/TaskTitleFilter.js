import { useFilterParams } from 'hooks/useFilterParams';

export const TaskTitleFilter = () => {
  const { taskTitle, changeTaskTitle } = useFilterParams();

  return (
    <input
      type="text"
      value={taskTitle}
      placeholder="Task filter"
      onChange={evt => changeTaskTitle(evt.target.value)}
    />
  );
};
