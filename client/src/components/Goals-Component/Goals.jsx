import { Link } from 'react-router-dom';
// Add task will link to a modal to add a task
// *** Move EDITGOAL to the individual goal modal ***
const GoalsList = ({ goals = []}) => {
  if (!goals.length) {
    return <h3>No Goals Yet</h3>;
  }
  return (
    <div className="goals-list">
      {goals.map((goal) => (
        <div>
          <h2>{goal.title}</h2>
          <p>{goal.completionDate}</p>
          <Link to={`/goals/${goal._id}`}>
            <button>Details</button>
          </Link>
          
        </div>
      ))}
    </div>
  )
};

export default GoalsList;