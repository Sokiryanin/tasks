import { TaskCard } from '../TaskCard/TaskCard';
import { StyledListItem } from './TaskList.styled';

export const TaskList = ({ items }) => {
  return (
    <ul>
      {items.map(item => (
        <StyledListItem key={item.id}>
          <TaskCard task={item} />
        </StyledListItem>
      ))}
    </ul>
  );
};
