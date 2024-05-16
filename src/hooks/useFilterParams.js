import { useSearchParams } from 'react-router-dom';

export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const priority = searchParams.get('priority') ?? 'all';
  const taskTitle = searchParams.get('taskTitle') ?? '';

  const changeTaskTitle = newTaskTitle => {
    // змінюємо тільки той параметр який потрібно змінити
    searchParams.set('taskTitle', newTaskTitle);
    setSearchParams(searchParams);
  };

  const changePriority = newPriority => {
    searchParams.set('priority', newPriority);
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchParams({
      taskTitle: '',
      priority: 'all',
    });
  };

  return {
    taskTitle,
    priority,
    changeTaskTitle,
    changePriority,
    resetFilters,
  };
};
