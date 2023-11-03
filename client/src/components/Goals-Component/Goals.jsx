import { Link } from 'react-router-dom';
// Add task will link to a modal to add a task
// *** Move EDITGOAL to the individual goal modal ***
const GoalsList = ({ goals }) => {
  if (!goals.length) {
    return <h3>No Goals Yet</h3>;
  }
  return (
    <div className="goals-list">
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
            {/* Complete button? <Link to={`/goals/${goal._id}`}> */}
          </div>
        </div>
      ))}
    </div>
  )
};

export default GoalsList;