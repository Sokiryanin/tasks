import { useEffect, useState } from 'react';
import {
  createBoard,
  createTask,
  deleteBoardById,
  deleteTaskById,
  fetchBoards,
  updateTask,
} from 'api';

import { SearchBar } from 'components/SearchBar/SearchBar';
import { StyledListItems, StyledListTasks } from 'components/App.styled';
import { ListHeader } from 'components/ListHeader/ListHeader';
import { TaskCardList } from 'components/TaskCardList/TaskCardList';
import { CreateNewBoard } from 'components/CreateNewBoard/CreateNewBoard';
import { useBoardsContext } from 'context/useBoardsContext';
import toast from 'react-hot-toast';

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

export default function BoardsPage() {
  const { boardsItems, setBoardsItems } = useBoardsContext();
  const [title, setTitle] = useState('');
  const [filters, setFilters] = useState(getInitialFilters);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
  }, [setBoardsItems]);

  /*
  еффект который реагирует на изменения в фильтре 
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

  /*
  отображает только те таски свойство taskTitle которых включают в себя введенный taskFilter,
  а так же возвращает те которые выбраны при помощи селект, изначально показывает все таски.
*/
  const visibleCards = useMemo(() => {
    return boardsItems.map(board => {
      // Фильтруем задачи для текущей доски
      const filteredTasks = board.tasks.filter(task => {
        const hasTaskTitle = task.taskTitle && task.taskTitle
          .toLowerCase()
          .includes(filters.taskTitle.toLowerCase());
        const isPriorityMatch =
          filters.priority === 'all' || (task.priority && task.priority === filters.priority);
        return hasTaskTitle && isPriorityMatch;
      });
  
      // Возвращаем новый объект доски с отфильтрованными задачами
      return {
        ...board,
        tasks: filteredTasks,
      };
    });
  };

  // Добавление новой доски
  function createNewBoardName(evt) {
    setTitle(evt.target.value);
  }

  const addBoard = async () => {
    try {
      setLoading(true);
      setError(false);

      const newBoard = { title, tasks: [] }; // Создаем объект новой доски

      if (title.length > 1) {
        const addedBoard = await createBoard(newBoard); // Отправляем запрос на сервер для создания новой доски
        setBoardsItems(prevBoardItems => [...prevBoardItems, addedBoard]);
        setTitle('');
        toast.success('Success create board!');
      } else {
        toast.error('Please, add some title board');
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
      toast.success('Success delete board!');
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
      toast.success('Success create task!');
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

      // Удаление задачи из базы данных
      await deleteTaskById(boardId, taskId);

      // Обновление стейта после удаления задачи
      setBoardsItems(prevItems =>
        prevItems.map(board => {
          if (board._id === boardId) {
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
      toast.success('Success delete task!');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // обновление карточки
  const updateTaskById = async (updatedTask, boardId, taskId) => {
    try {
      setLoading(true);
      setError(false);

      // Отправляем запрос на сервер для обновления задачи
      const updatedTaskData = await updateTask(updatedTask, boardId, taskId);

      setBoardsItems(prevItems =>
        prevItems.map(board => {
          if (board._id === updatedTaskData._id) {
            // Если идентификаторы совпадают, заменяем доску на новую
            return updatedTaskData;
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

  return (
    <div>
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
              addTask={addTask}
            />

            {visibleCards.length > 0 && (
              <TaskCardList
                items={item.tasks}
                listId={item._id}
                onDeleteCard={deleteTask}
                onUpdateCard={updateTaskById}
              />
            )}
          </StyledListItems>
        ))}
      </StyledListTasks>
      {loading && <div>LOADING...</div>}

      {/* если ошибка то показываем сообщение об ошибке */}
      {error && !loading && <div>Oops! There was an error! </div>}
    </div>
  );
}
