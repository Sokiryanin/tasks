import { TaskCard } from '../TaskCard/TaskCard';
import { StyledListItem } from './TaskCardList.styled';

export const TaskCardList = ({ items, onDeleteCard, listId, onUpdateCard }) => {
  return (
    <ul>
      {items.map(item => (
        <StyledListItem key={item._id}>
          <TaskCard
            task={item}
            onDeleteCard={onDeleteCard}
            boardId={listId}
            onUpdateCard={onUpdateCard}
          />
        </StyledListItem>
      ))}
    </ul>
  );
};
