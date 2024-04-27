import BasicPopover from 'components/EditBtn/EditBtn';
import { TaskHeaderWrapper } from './ListHeader.styled';

export const ListHeader = ({ header, onDeleteBoard, id, cardCount }) => {
  return (
    <TaskHeaderWrapper>
      <h3>{header}</h3>
      <p>{cardCount}</p>
      <BasicPopover
        onDeleteBoard={onDeleteBoard}
        contentType="list"
        listId={id}
      ></BasicPopover>
    </TaskHeaderWrapper>
  );
};
