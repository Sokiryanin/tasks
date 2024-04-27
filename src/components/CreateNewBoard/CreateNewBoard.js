import { CreateListWrap } from './CreateNewBoard.styled';

export const CreateNewBoard = ({ newBoard, addNewBoardName, addBoard }) => {
  return (
    <CreateListWrap>
      <label>
        New board:
        <input
          name="title"
          type="text"
          value={newBoard}
          onChange={addNewBoardName}
        />
      </label>
      <button onClick={addBoard}>Create new board</button>
    </CreateListWrap>
  );
};
