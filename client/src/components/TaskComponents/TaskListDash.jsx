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
    console.log("date", timestamp)
    let monthNum = timeStamp.getMonth();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currentMonth = months[monthNum];
    let day = timeStamp.getDate();
    let year = timeStamp.getFullYear();
  
    return `${currentMonth} ${day}, ${year}`;
    
  }

  const tasksCopy = [...tasks];
  tasksCopy.sort((a, b) => a.completionDate - b.completionDate);
  const next5Tasks = tasksCopy.slice(0, 5);


  // const [isComplete, setIsComplete] = useState(task.isComplete);
  
  // const toggleComplete = (value) => {
  //   setIsComplete(value);
  // };

  // useEffect(() => {
	// 	// send updated isComplete value to graphQL server when it changes
	// 	// call mutation here to update task's isComplete field
	// 	// Example: useMutation(UPDATE_TASK_COMPLETION ({ variables: { taskId: task.id, isComplete } }));
	// }, [isComplete]);

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
