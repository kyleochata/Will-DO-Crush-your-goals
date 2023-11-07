import { Link } from 'react-router-dom';
import "../Dashboard/Dashboard.css";
import { useState, useEffect } from 'react';
import CheckboxComponent from './Checkbox';

const TasksListDash = ({ tasks = [] }) => {
  if (!tasks.length) {
    return <h3 className="noTasks">NO TASKS YET</h3>;
  }

  const [filter, setFilter] = useState('all');

  const format_date = (timestamp) => {
    //month is index 0-11. must add 1 to get correct month
    let timeStamp = new Date(parseInt(timestamp));
    let monthNum = timeStamp.getMonth();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currentMonth = months[monthNum];
    let day = timeStamp.getDate();
    let year = timeStamp.getFullYear();
  
    return `${currentMonth} ${day}, ${year}`;
    
  }

  const openTasks = tasks.filter((task) => !task.completed);
  openTasks.sort((a, b) => a.completionDate - b.completionDate);
  const next5Tasks = openTasks.slice(0, 5);

  return (
    <div className="tasksList">
      {next5Tasks.map((task) => (
        <div className="cardText" key={task._id}>
          <Link to={`/tasks/${task._id}`}> 
            <div className="liItem">
            <h2 className="taskListTitle">{task.title}</h2>
            <p className="regularText">Target Date: {format_date(task.completionDate)}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TasksListDash;
