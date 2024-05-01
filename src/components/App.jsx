import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { SearchBar } from './SearchBar/SearchBar';
import { TaskCardList } from './TaskCardList/TaskCardList';
import { ListHeader } from './ListHeader/ListHeader';
import { StyledListItems, StyledListTasks, StyledSection } from './App.styled';
import {
  createBoard,
  createTask,
  deleteBoardById,
  deleteTaskById,
  fetchBoards,
} from 'api';
import BasicModal from './Modal/Modal';

import { CreateNewBoard } from './CreateNewBoard/CreateNewBoard';

const getInitialFilters = () => {
  // получаем из localStorage выставленные ранее фильтры
  const savedFilters = localStorage.getItem('filters');
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return {
    taskTitle: '',
    priority: 'all',
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

  /* 
  еффект который реагирует на изменения в фильтр
  сохраняет выставленные фильтры в localStorage
*/

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  const changeFilters = (value, key) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // сброс всех фильтров
  const resetFilters = () => {
    setFilters({
      taskTitle: '',
      priority: 'all',
    });
  };

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

  // удаление доски
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

      const addedTask = await createTask(newTask, listId);

      setBoardsItems(prevItems =>
        prevItems.map(board => {
          if (board._id === addedTask._id) {
            // Если идентификаторы совпадают, заменяем доску на новую
            return addedTask;
          } else {
            // Возвращаем остальные доски без изменений
            return board;
          }
        })
      );

      toast.success('Successfully added new task');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // удаление карточек
  const deleteTask = async (boardId, taskId) => {
    try {
      setLoading(true);
      setError(false);

      const deletedTask = await deleteTaskById(boardId, taskId);

      setBoardsItems(prevItems =>
        prevItems.map(board => {
          if (board._id === deletedTask.boardId) {
            // Возвращаем новый объект доски без удаленной задачи
            return {
              ...board,
              tasks: board.tasks.filter(task => task._id !== taskId),
            };
          } else {
            // Возвращаем остальные доски без изменений
            return board;
          }
        })
      );
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /*
  отображает только те таски свойство taskTitle которых включают в себя введенный taskFilter,
  а так же возвращает те которые выбраны при помощи селект, изначально показывает все таски.
*/
  const visibleCards = boardsItems.map(board => {
    // Фильтруем задачи для текущей доски
    const filteredTasks = board.tasks.filter(task => {
      const hasTaskTitle = task.taskTitle
        .toLowerCase()
        .includes(filters.taskTitle.toLowerCase());
      const isPriorityMatch =
        filters.priority === 'all' || task.priority === filters.priority;
      return hasTaskTitle && isPriorityMatch;
    });

    // Возвращаем новый объект доски с отфильтрованными задачами
    return {
      ...board,
      tasks: filteredTasks,
    };
  });

  /*
     фильтр заданий по level
  const changeLevelFilter = newLevel => {
    setFilters(prevFilters => ({
      ...prevFilters,
      level: newLevel,
    }));
  };

  фильтр по слову
  const changeTaskFilter = newTask => {
    setFilters(prevFilters => ({
      ...prevFilters,
      task: newTask,
    }));
  };
   */

  return (
    <StyledSection>
      <CreateNewBoard
        newBoard={title}
        addNewBoardName={createNewBoardName}
        addBoard={addBoard}
      />
      <SearchBar
        priority={filters.priority}
        taskTitle={filters.taskTitle}
        onChange={changeFilters}
        onReset={resetFilters}
      />

      <StyledListTasks>
        {visibleCards.map(item => (
          <StyledListItems key={item._id}>
            <ListHeader
              header={item.title}
              id={item._id}
              onDeleteBoard={deleteBoard}
              cardCount={item.tasks.length}
            />
            <BasicModal onAdd={addTask} id={item._id} />

            {visibleCards.length > 0 && (
              <TaskCardList
                items={item.tasks}
                listId={item._id}
                onDeleteCard={deleteTask}
              />
            )}
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
