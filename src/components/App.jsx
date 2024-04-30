import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { SearchBar } from './SearchBar/SearchBar';
import { TaskCardList } from './TaskCardList/TaskCardList';
import { ListHeader } from './ListHeader/ListHeader';
import { StyledListItems, StyledListTasks, StyledSection } from './App.styled';
import { createBoard, createTask, deleteBoardById, fetchBoards } from 'api';
import BasicModal from './Modal/Modal';

import { CreateNewBoard } from './CreateNewBoard/CreateNewBoard';

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
  const [boardsItems, setBoardsItems] = useState([]);
  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  // еффект для вызова всех карточек с бекенда
  useEffect(() => {
    async function getBoards() {
      try {
        setLoading(true);
        setError(false);
        const boards = await fetchBoards();
        setBoardsItems(boards);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getBoards();
  }, []);

  // еффект который реагирует на изменения в фильтр
  // сохраняет выставленные фильтры в localStorage

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  // Добавление новой доски
  const createNewBoardName = evt => {
    setTitle(evt.target.value);
  };

  const addBoard = async () => {
    try {
      setLoading(true);
      setError(false);

      const newBoard = { title, tasks: [] }; // Создаем объект новой доски
      const addedBoard = await createBoard(newBoard); // Отправляем запрос на сервер для создания новой доски

      if (title.length > 1) {
        setBoardsItems(prevBoardItems => [...prevBoardItems, addedBoard]);
        setTitle('');
        toast.success('Successfully added new board');
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // удаление доскиx
  const deleteBoard = async listId => {
    try {
      setLoading(true);
      setError(false);
      await deleteBoardById(listId);

      setBoardsItems(prevItems =>
        prevItems.filter(list => list._id !== listId)
      );
      toast.success('Successfully deleted board');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // добавление карточек
  const addTask = async (newTask, listId) => {
    try {
      setLoading(true);
      setError(false);

      await createTask(newTask, listId);

      setBoardsItems(prevItems => {
        return prevItems.map(board => {
          if (board._id === listId) {
            return {
              ...board,
              tasks: [...board.tasks, newTask], // Добавляем новую задачу в массив задач доски
            };
          } else {
            return board;
          }
        });
      });
      toast.success('Successfully added new task');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // удаление карточек
  // const deleteTask = async taskId => {
  //   try {
  //     setLoading(true);
  //     setError(false);

  //     const deletedTask = await deleteBoardById(taskId);
  //     setBoards(prevItems =>
  //       prevItems.filter(task => task._id !== deletedTask.id)
  //     );

  //     toast.success('Successfully delete task');
  //   } catch (error) {
  //     setError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // отображает только те таски свойство name которых включают в себя введенный taskFilter,
  // а так же возвращает те которые выбраны при помощи селект, изначально показывает все таски.

  // const visibleCards = boards.filter(task => {
  //   const hasName = task.taskTitle
  //     .toLowerCase()
  //     .includes(filters.task.toLocaleLowerCase());

  //   if (filters.level === 'all') {
  //     return hasName;
  //   }
  //   return hasName && task.priority === filters.level;
  // });

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
      <CreateNewBoard
        newBoard={title}
        addNewBoardName={createNewBoardName}
        addBoard={addBoard}
      />
      <SearchBar
        level={filters.level}
        task={filters.task}
        onChange={changeFilters}
        onReset={resetFilters}
      />

      <StyledListTasks>
        {boardsItems.map(item => (
          <StyledListItems key={item._id}>
            <ListHeader
              header={item.title}
              id={item._id}
              onDeleteBoard={deleteBoard}
              cardCount={item.tasks.length}

              // cardCount={visibleCards.length}
            />
            <BasicModal onAdd={addTask} id={item._id} />
            <TaskCardList items={item.tasks} />
            {/* если пустой массив то список карточек не рендерим 
            {visibleCards.length > 0 && (
              <TaskCardList
                items={visibleCards}
                onDeleteCard={deleteTask}
              />
            )} */}
          </StyledListItems>
        ))}
      </StyledListTasks>
      {loading && <div>LOADING...</div>}

      {/* если ошибка то показываем сообщение об ошибке */}
      {error && !loading && <div>Oops! There was an error! </div>}
      <Toaster position="bottom-center" reverseOrder={false} />
    </StyledSection>
  );
};
