import { Link, Navi } from 'components/App.styled';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

export const Layout = () => {
  return (
    <Wrapper>
      <header>
        <Navi>
          <Link to="/create">Create Task</Link>
          <Link to="/boards">Board list</Link>
        </Navi>
      </header>
      <Outlet />
    </Wrapper>
  );
};
