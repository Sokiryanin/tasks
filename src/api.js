// import axios from 'axios';

// axios.defaults.baseURL = 'https://task-back-c189.onrender.com/api';

// export const fetchBoards = async () => {
//   const resp = await axios.get('/boards');
//   return resp.data;
// };

// export const createBoard = async newBoard => {
//   const resp = await axios.post('/boards', newBoard);
//   console.log(resp.data);
//   return resp.data;
// };

// export const deleteBoardById = async listId => {
//   await axios.delete(`/boards/${listId}`);
//   return listId;
// };

// export const createTask = async (newTask, listId) => {
//   const resp = await axios.post(`/boards/${listId}/tasks`, newTask);
//   return resp.data;
// };

// export const deleteTaskById = async (boardId, taskId) => {
//   const resp = await axios.delete(`/boards/${boardId}/tasks/${taskId}`);
//   return resp.data;
// };

// export const updateTask = async (updatedTask, boardId, taskId) => {
//   const resp = await axios.put(
//     `/boards/${boardId}/tasks/${taskId}`,
//     updatedTask
//   );

//   return resp.data;
// };

// export const fetchTaskById = async (boardId, taskId) => {
//   const resp = await axios.get(`/boards/${boardId}/tasks/${taskId}`);

//   return resp.data;
// };

import axios from 'axios';

// Установка базового URL в зависимости от среды развертывания
const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://sokiryanin.github.io/tasks/api' // URL вашего бэкенда на GitHub Pages
    : 'https://task-back-c189.onrender.com/api'; // URL вашего бэкенда в других средах разработки

axios.defaults.baseURL = baseURL;

export const fetchBoards = async () => {
  const resp = await axios.get('/boards');
  return resp.data;
};

export const createBoard = async newBoard => {
  const resp = await axios.post('/boards', newBoard);
  console.log(resp.data);
  return resp.data;
};

export const deleteBoardById = async listId => {
  await axios.delete(`/boards/${listId}`);
  return listId;
};

export const createTask = async (newTask, listId) => {
  const resp = await axios.post(`/boards/${listId}/tasks`, newTask);
  return resp.data;
};

export const deleteTaskById = async (boardId, taskId) => {
  const resp = await axios.delete(`/boards/${boardId}/tasks/${taskId}`);
  return resp.data;
};

export const updateTask = async (updatedTask, boardId, taskId) => {
  const resp = await axios.put(
    `/boards/${boardId}/tasks/${taskId}`,
    updatedTask
  );

  return resp.data;
};

export const fetchTaskById = async (boardId, taskId) => {
  const resp = await axios.get(`/boards/${boardId}/tasks/${taskId}`);

  return resp.data;
};
