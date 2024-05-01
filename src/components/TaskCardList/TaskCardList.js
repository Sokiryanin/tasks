import { TaskCard } from '../TaskCard/TaskCard';
import { StyledListItem } from './TaskCardList.styled';

export const TaskCardList = ({ items, onDeleteCard, listId }) => {
  return (
    <ul>
      {items.map(item => (
        <StyledListItem key={item._id}>
          <TaskCard task={item} onDeleteCard={onDeleteCard} boardId={listId} />
        </StyledListItem>
      ))}
    </ul>
  );
};
