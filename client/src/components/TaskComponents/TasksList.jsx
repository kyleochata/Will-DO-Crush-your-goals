import { Link } from 'react-router-dom';

import { useState } from 'react';
import CheckboxComponent from './Checkbox';

const TasksList = ({ tasks = [] }) => {
  if (!tasks.length) {
    return <h3>No Tasks Yet</h3>;
  }

  const [filter, setFilter] = useState('all');

  return (
    <div className="tasks-list">
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
        <div className="task-preview" key={task.id}>
          {/* figure out how to link to modal instead of page */}
          <Link to={`/tasks/${task.id}`}> 
            <h2>{task.title}</h2>
            {/* should we include descriptions? */}
            <p>{task.description}</p>
          </Link>
          {/* how to link checkbox component with isCompleted boolean? */}
          <CheckboxComponent />
        </div>
      ))}
    </div>
  );
};

export default TasksList;
