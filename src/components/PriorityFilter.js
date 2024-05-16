import { useFilterParams } from 'hooks/useFilterParams';

export const PriorityFilter = () => {
  const { priority, changePriority } = useFilterParams();

  return (
    <select value={priority} onChange={evt => changePriority(evt.target.value)}>
      <option value="all">All</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  );
};
