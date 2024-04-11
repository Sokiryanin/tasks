import axios from 'axios';

axios.defaults.baseURL = 'https://6617aaaded6b8fa43483618a.mockapi.io/';

export const fetchTasks = async () => {
  const resp = await axios.get('/tasks');

  return resp.data;
};

export const deleteTaskById = async taskId => {
  const resp = await axios.delete(`/tasks/${taskId}`);

  return resp.data;
};

export const createTask = async task => {
  /* что б записать новую таску нужно передать обьект, который 
    приведется в JSON.stringify и т.д. */
  const resp = await axios.post('/tasks', task);
  return resp.data;
};
