import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledSection = styled.section`
  padding: 0 20px;
  margin: 0 auto;
`;

export const StyledListTasks = styled.ul`
  display: flex;
  flex: wrap;
  gap: 20px;
`;

export const StyledListItems = styled.li`
  width: 100%;
`;

export const Navi = styled.nav`
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;

  &.active {
    color: white;
    background-color: rgb(25, 118, 210);
  }
`;
