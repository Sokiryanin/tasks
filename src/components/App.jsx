import { Component } from 'react';
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

export class App extends Component {
  state = {
    listItems: initialTaskList,
    taskItems: [],
    loading: false,
    error: false,
    filters: {
      task: '',
      level: 'all',
    },
  };

  async componentDidMount() {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters !== null) {
      const filters = JSON.parse(savedFilters);

      this.setState({
        filters,
      });
    }

    try {
      this.setState({ loading: true });
      this.setState({ error: false });
      const tasks = await fetchTasks();
      this.setState({ taskItems: tasks });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.filters !== this.state.filters) {
      localStorage.setItem('filters', JSON.stringify(this.state.filters));
    }
  }

  addTask = async newTask => {
    try {
      this.setState({ loading: true });
      this.setState({ error: false });

      const addedTask = await createTask(newTask);

      this.setState(prevState => ({
        taskItems: [...prevState.taskItems, addedTask],
      }));
      toast.success('Successfully add task');
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  deleteTask = async taskId => {
    try {
      this.setState({ loading: true });
      this.setState({ error: false });
      const deletedTask = await deleteTaskById(taskId);
      this.setState(prevState => ({
        taskItems: prevState.taskItems.filter(
          task => task.id !== deletedTask.id
        ),
      }));
      toast.success('Successfully delete task');
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  deleteList = listId => {
    this.setState(prevState => ({
      listItems: prevState.listItems.filter(list => list.id !== listId),
    }));
  };

  changeLevelFilter = newLevel => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        level: newLevel,
      },
    }));
  };

  resetFilters = () => {
    this.setState({
      filters: {
        task: '',
        level: 'all',
      },
    });
  };

  changeTaskFilter = newTask => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        task: newTask,
      },
    }));
  };

  getVisibleCardsItems = () => {
    const { taskItems, filters } = this.state;

    // отображает только те таски свойство name которых включают в себя введенный taskFilter,
    // а так же возвращает те которые выбраны при помощи селект, изначально показывает все таски.

    return taskItems.filter(task => {
      const hasName = task.name
        .toLowerCase()
        .includes(filters.task.toLocaleLowerCase());

      if (filters.level === 'all') {
        return hasName;
      }
      return hasName && task.level === filters.level;
    });
  };

  render() {
    const { filters, listItems, loading, error } = this.state;

    const visibleCards = this.getVisibleCardsItems();

    return (
      <StyledSection>
        <TaskForm onAdd={this.addTask} />
        <SearchBar
          level={filters.level}
          task={filters.task}
          onChangeLevel={this.changeLevelFilter}
          onChangeTask={this.changeTaskFilter}
          onReset={this.resetFilters}
        />

        <StyledListTasks>
          {listItems.map(item => (
            <StyledListItems key={item.id}>
              <ListHeader
                header={item.name}
                id={item.id}
                onDeleteList={this.deleteList}
                cardCount={visibleCards.length}
              />
              <StyledAddCardBtn>Add new card</StyledAddCardBtn>

              {/* если пустой массив то список карточек не рендерим  */}
              {visibleCards.length > 0 && (
                <TaskCardList
                  items={visibleCards}
                  onDeleteCard={this.deleteTask}
                />
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
  }
}
