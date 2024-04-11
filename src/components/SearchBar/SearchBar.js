import { SearchBarWrapp } from './SearchBar.styled';

export const SearchBar = ({ level, task, onChange, onReset }) => {
  return (
    <SearchBarWrapp>
      <input
        type="text"
        value={task}
        placeholder="Task filter"
        onChange={evt => onChange(evt.target.value, 'name')}
      />
      <select
        value={level}
        onChange={evt => {
          onChange(evt.target.value, 'level');
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
