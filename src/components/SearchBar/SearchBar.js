import { SearchBarWrapp } from './SearchBar.styled';

export const SearchBar = ({ priority, taskTitle, onChange, onReset }) => {
  return (
    <SearchBarWrapp>
      <input
        type="text"
        value={taskTitle}
        placeholder="Task filter"
        onChange={evt => onChange(evt.target.value, 'taskTitle')}
      />
      <select
        value={priority}
        onChange={evt => {
          onChange(evt.target.value, 'priority');
        }}
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={onReset}>Reset filters</button>
    </SearchBarWrapp>
  );
};
