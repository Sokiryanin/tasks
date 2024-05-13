import { createTask } from 'api';
import { TaskForm } from 'components/TaskForm/TaskForm';
import { useBoardsContext } from 'context/useBoardsContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateTaskPage() {
  const { boardsItems } = useBoardsContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addTask = async (newTask, listId) => {
    try {
      setLoading(true);
      setError(false);

      await createTask(newTask, listId);
      toast.success('Success create task!');
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TaskForm boards={boardsItems} onAdd={addTask} />
      {loading && <div>LOADING...</div>}

      {/* если ошибка то показываем сообщение об ошибке */}
      {error && !loading && <div>Oops! There was an error! </div>}
    </div>
  );
}
