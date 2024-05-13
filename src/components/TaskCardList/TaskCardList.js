import BasicCard from 'components/TaskCard/Card';
// import { TaskCard } from '../TaskCard/TaskCard';
import { StyledListItem } from './TaskCardList.styled';

export const TaskCardList = ({ items, onDeleteCard, listId, onUpdateCard }) => {
  return (
    <ul>
      {items.map(item => (
        <StyledListItem key={item._id}>
          <BasicCard
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
