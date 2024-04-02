import { AddCardBtn } from './AddCardBtn';
import { ListHeader } from './ListHeader';
import { QuizForm } from './QuizForm';
import { SearchBar } from './SearchBar';
import { ToDoList } from './ToDoList';
import taskItems from '../task-items.json';

export const App = () => {
  return (
    <div>
      <QuizForm />
      <SearchBar />
      <AddCardBtn />
      <ListHeader />
      <ToDoList items={taskItems} />
    </div>
  );
};
