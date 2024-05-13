import { Route, Routes } from 'react-router-dom';
import BoardsPage from 'pages/BoardsPage';
import CreateTaskPage from 'pages/CreateTaskPage';
import { BoardsProvider } from '../context/useBoardsContext';

import TaskPage from 'pages/TaskPage';
import { Layout } from './Layout/Layout';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <BoardsProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="create" element={<CreateTaskPage />} />
          <Route path="boards/:id/tasks/:taskId" element={<TaskPage />} />
          <Route path="boards" element={<BoardsPage />} />
        </Route>
      </Routes>
      <Toaster position="bottom-center" />
    </BoardsProvider>
  );
};
