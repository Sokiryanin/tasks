import BasicPopover from 'components/EditBtn/EditBtn';
import { TaskHeaderWrapper } from './ListHeader.styled';
import BasicModal from 'components/Modal/Modal';

export const ListHeader = ({
  header,
  onDeleteBoard,
  id,
  cardCount,
  addTask,
}) => {
  return (
    <>
      <TaskHeaderWrapper>
        <h3>{header}</h3>
        <p>{cardCount}</p>
        <BasicPopover
          onDeleteBoard={onDeleteBoard}
          contentType="list"
          listId={id}
        ></BasicPopover>
      </TaskHeaderWrapper>
      <BasicModal onAdd={addTask} id={id} contentType="add" />
    </>
  );
};
