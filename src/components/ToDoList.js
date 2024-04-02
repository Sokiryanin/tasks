import { TaskCard } from './TaskCard';

export const ToDoList = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <TaskCard task={item} />
        </li>
      ))}
    </ul>
  );
};
