import taskItems from '../task-items.json';

import { QuizForm } from './QuizForm/QuizForm';
import { SearchBar } from './SearchBar/SearchBar';

import { TaskList } from './TaskList/TaskList';
import { ListHeader } from './ListHeader/ListHeader';
import { AddCardBtn } from './AddCardBtn/AddCardBtn';
import { Container } from './Container/Container.styled.js';
import { ListContainer } from './ListContainer/ListContainer.styled.js';
import { StyledSection } from './Section.styled';

export const App = () => {
  return (
    <>
      <StyledSection>
        <QuizForm />
        <SearchBar />

        <Container>
          <ListContainer>
            <div>
              <ListHeader header="ToDo" />
            </div>
            <AddCardBtn />
            <div>
              <TaskList items={taskItems} />
            </div>
          </ListContainer>
          <ListContainer>
            <div>
              <ListHeader header="Planned" />
            </div>
            <AddCardBtn />
            <div>
              <TaskList items={taskItems} />
            </div>
          </ListContainer>
          <ListContainer>
            <div>
              <ListHeader header="In progress" />
            </div>
            <AddCardBtn />
            <div>
              <TaskList items={taskItems} />
            </div>
          </ListContainer>
          <ListContainer>
            <div>
              <ListHeader header="Closed" />
            </div>
            <AddCardBtn />
            <div>
              <TaskList items={taskItems} />
            </div>
          </ListContainer>
        </Container>
      </StyledSection>
    </>
  );
};
