import { SearchBarWrapp } from './SearchBar.styled';
import { TaskTitleFilter } from 'components/TaskTitleFilter';
import { PriorityFilter } from 'components/PriorityFilter';
import { useFilterParams } from 'hooks/useFilterParams';

export const SearchBar = () => {
  const { resetFilters } = useFilterParams();

  return (
    <SearchBarWrapp>
      <TaskTitleFilter />
      <PriorityFilter />
      <button onClick={resetFilters}>Reset filters</button>
    </SearchBarWrapp>
  );
};
