import { Link } from 'react-router-dom';
import "../Dashboard/Dashboard.css";
import { useState, useEffect } from 'react';

const GoalsListDash = ({ goals = [] }) => {
  if (!goals.length) {
    return <h3 className={style.noTasks}>NO GOALS YET</h3>;
  }

  const [filter, setFilter] = useState('all');

  const format_date = (timestamp) => {
    let timeStamp = new Date(parseInt(timestamp));
    console.log("date", timestamp)
    let monthNum = timeStamp.getMonth();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currentMonth = months[monthNum];
    let day = timeStamp.getDate();
    let year = timeStamp.getFullYear();
  
    return `${currentMonth} ${day}, ${year}`;
    
  }

    const goalsCopy = [...goals];
    goalsCopy.sort((a, b) => a.completionDate - b.completionDate);
    const next5Goals = goalsCopy.slice(0, 5);



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
      {next5Goals.map((goal) => (
        <div className="cardText" key={goal._id}>
          <Link to={`/tasks/${goal._id}`}> 
            <div className="liItem">
            <h2 className="taskListTitle">{goal.title}</h2>
            <p className="regularText">Target Date: {format_date(goal.completionDate)}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GoalsListDash;