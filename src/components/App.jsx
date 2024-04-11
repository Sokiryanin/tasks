import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import initialTaskList from '../task-list.json';

import { TaskForm } from './TaskForm/TaskForm';
import { SearchBar } from './SearchBar/SearchBar';

import { TaskCardList } from './TaskCardList/TaskCardList';
import { ListHeader } from './ListHeader/ListHeader';

import {
  StyledAddCardBtn,
  StyledListItems,
  StyledListTasks,
  StyledSection,
} from './App.styled';

import { createTask, deleteTaskById, fetchTasks } from 'api';

const getInitialFilters = () => {
  // получаем из localStorage выставленные ранее фильтры
  const savedFilters = localStorage.getItem('filters');
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return {
    task: '',
    level: 'all',
  };
};

export const App = () => {
  const [taskItems, setTaskItems] = useState([]);
  const [listItems, setListItems] = useState(initialTaskList);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  // еффект для вызова всех карточек с бекенда
  useEffect(() => {
    async function getTasks() {
      try {
        setLoading(true);
        setError(false);
        const tasks = await fetchTasks();
        setTaskItems(tasks);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getTasks();
  }, []);

  // еффект который реагирует на изменения в фильтр
  // сохраняет выставленные фильтры в localStorage

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  // добавление карточек
  const addTask = async newTask => {
    try {
      setLoading(true);
      setError(false);

      const addedTask = await createTask(newTask);
      setTaskItems(prevItems => [...prevItems, addedTask]);
      toast.success('Successfully add task');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // удаление карточек
  const deleteTask = async taskId => {
    try {
      setLoading(true);
      setError(false);

      const deletedTask = await deleteTaskById(taskId);
      setTaskItems(prevItems =>
        prevItems.filter(task => task.id !== deletedTask.id)
      );

      toast.success('Successfully delete task');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // удаление списка
  const deleteList = listId => {
    setListItems(prevItems => prevItems.filter(list => list.id !== listId));
  };

  // отображает только те таски свойство name которых включают в себя введенный taskFilter,
  // а так же возвращает те которые выбраны при помощи селект, изначально показывает все таски.
  const visibleCards = taskItems.filter(task => {
    const hasName = task.name
      .toLowerCase()
      .includes(filters.task.toLocaleLowerCase());

    if (filters.level === 'all') {
      return hasName;
    }
    return hasName && task.level === filters.level;
  });

  // фильтр заданий по level
  // const changeLevelFilter = newLevel => {
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     level: newLevel,
  //   }));
  // };

  // фильтр по слову
  // const changeTaskFilter = newTask => {
  //   setFilters(prevFilters => ({
  //     ...prevFilters,
  //     task: newTask,
  //   }));
  // };

  // Функция для фильтров. Сделал из двух одну

  const changeFilters = (value, key) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // сброс всех фильтров
  const resetFilters = () => {
    setFilters({
      task: '',
      level: 'all',
    });
  };

  return (
    <StyledSection>
      <TaskForm onAdd={addTask} />
      <SearchBar
        level={filters.level}
        task={filters.task}
        onChange={changeFilters}
        onReset={resetFilters}
      />

      <StyledListTasks>
        {listItems.map(item => (
          <StyledListItems key={item.id}>
            <ListHeader
              header={item.name}
              id={item.id}
              onDeleteList={deleteList}
              cardCount={visibleCards.length}
            />
            <StyledAddCardBtn>Add new card</StyledAddCardBtn>

            {/* если пустой массив то список карточек не рендерим  */}
            {visibleCards.length > 0 && (
              <TaskCardList items={visibleCards} onDeleteCard={deleteTask} />
            )}
          </StyledListItems>
        ))}
      </StyledListTasks>
      {loading && <div>LOADING...</div>}

      {/* если ошибка то показываем сообщение об ошибке */}
      {error && !loading && <div>Oops! There was an error! </div>}
      <Toaster />
    </StyledSection>
  );
};
