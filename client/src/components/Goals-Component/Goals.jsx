import { Link } from 'react-router-dom';
import style from "../../pages/Tasks/Tasks.module.css";

// Add task will link to a modal to add a task
const GoalsList = ({ goals = []}) => {
  if (!goals.length) {
    return <h3 className={style.noTasks}>No Goals Yet</h3>;
  }
  return (
    <div className="card-text">
      {goals.map((goal) => (
        <div>
          <div>
            <h2>{goal.title}</h2>
            <p>{goal.completionDate}</p>
            <p>{goal.why}</p>
          </div>
          <div>
            <Link to={`/goals/${goal._id}`}>
              <button>Details</button>
            </Link>
            {/* add Vanna's task component to addTask which brings up the task modal. */}
          </div>
        </div>
      ))}
    </div>
  )
};

export default GoalsList;