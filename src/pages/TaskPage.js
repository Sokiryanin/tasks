import { fetchTaskById } from 'api';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function TaskPage() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        setError(false);
        const fetchedTask = await fetchTaskById(params.id, params.taskId);
        setTask(fetchedTask);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, [params]);

  return (
    <div>
      {task && (
        <div>
          <h3>{task.taskTitle}</h3>
          <p>{task.description}</p>
          <p>{task.deadline}</p>
          <p>{task.priority}</p>
        </div>
      )}

      <Link to={location?.state?.from ?? '/boards'}>Back to boards</Link>

      {loading && <div>LOADING...</div>}

      {/* если ошибка то показываем сообщение об ошибке */}
      {error && !loading && <div>Oops! There was an error! </div>}
    </div>
  );
}

export default TaskPage;
