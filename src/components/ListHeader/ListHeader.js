import { TaskHeaderWrapper } from './TaskHeaderWrapper.styled';

export const ListHeader = ({ header }) => {
  return (
    <TaskHeaderWrapper>
      <h3>{header}</h3>
      <p>0</p>
      <button type="button">...</button>
    </TaskHeaderWrapper>
  );
};
