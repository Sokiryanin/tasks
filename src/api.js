import axios from 'axios';

axios.defaults.baseURL = 'https://task-back-c189.onrender.com/api';

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

// export const createTask = async task => {
//   /* что б записать новую таску нужно передать обьект, который
//     приведется в JSON.stringify и т.д. */
//   const resp = await axios.post('/boards', task);
//   return resp.data;
// };


