import initialTaskItems from '../task-items.json';
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

import { Component } from 'react';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    listItems: initialTaskList,
    taskItems: initialTaskItems,
    filters: {
      task: '',
      level: 'all',
    },
  };

  addTask = newTask => {
    console.log(newTask);
    this.setState(prevState => ({
      taskItems: [...prevState.taskItems, { id: nanoid(), ...newTask }],
    }));
  };

  deleteTask = taskId => {
    this.setState(prevState => ({
      taskItems: prevState.taskItems.filter(task => task.id !== taskId),
    }));
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
    // а так же возвращает те которые выбраны при помощи селекте, изначально показывает все таски.

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
    const { filters, listItems } = this.state;

    const visibleCards = this.getVisibleCardsItems();
    console.log(visibleCards.length);

    return (
      <StyledSection>
        <TaskForm onAdd={this.addTask} />
        <SearchBar
          level={filters.level}
          task={filters.task}
          onChangeLevel={this.changeLevelFilter}
          onChangeTask={this.changeTaskFilter}
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
              <TaskCardList
                items={visibleCards}
                onDeleteCard={this.deleteTask}
              />
            </StyledListItems>
          ))}
        </StyledListTasks>
      </StyledSection>
    );
  }
}
