import { SearchBarWrapp } from './SearchBar.styled';

export const SearchBar = ({ level, task, onChangeLevel, onChangeTask }) => {
  return (
    <SearchBarWrapp>
      <input
        type="text"
        value={task}
        placeholder="Task filter"
        onChange={evt => {
          onChangeTask(evt.target.value);
        }}
      />
      <select
        value={level}
        onChange={evt => {
          onChangeLevel(evt.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </SearchBarWrapp>
  );
};
