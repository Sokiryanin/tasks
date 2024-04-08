import BasicPopover from 'components/EditBtn/EditBtn';
import { TaskHeaderWrapper } from './ListHeader.styled';

export const ListHeader = ({ header, onDeleteList, id, cardCount }) => {
  return (
    <TaskHeaderWrapper>
      <h3>{header}</h3>
      <p>{cardCount}</p>
      <BasicPopover
        onDeleteList={onDeleteList}
        contentType="list"
        listId={id}
      ></BasicPopover>
    </TaskHeaderWrapper>
  );
};
