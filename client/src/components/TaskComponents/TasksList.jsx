import { Link } from 'react-router-dom';
import style from "../../pages/Tasks/Tasks.module.css";
import { useState } from 'react';
import CheckboxComponent from './Checkbox';

const TasksList = ({ tasks = [] }) => {
  if (!tasks.length) {
    return <h3 className={style.noTasks}>NO TASKS YET</h3>;
  }

  const [filter, setFilter] = useState('all');

  return (
    <div className={style.tasks-list}>
      <div className='task-filter'>
        <select
          onChange={(e) => setFilter(e.target.value) } 
          value={filter}
        >
          <option value='all'>All</option>
          <option value='active'>Open</option>
          <option value='completed'>Completed</option>
          <option value='low'>Low Priority</option>
          <option value='medium'>Medium Priority</option>
          <option value='high'>High Priority</option>
        </select>
      </div>
      {tasks.map((task) => (
        <div className="card-text" key={task.id}>
          {/* figure out how to link to modal instead of page */}
          <Link to={`/tasks/${task.id}`}> 
            <h2 className="liItem">{task.title}</h2>
            {/* should we include descriptions? */}
            <p>{task.description}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
