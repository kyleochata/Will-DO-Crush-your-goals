const SingleGoal = ({ goal }) => {
  return (
    <div>
      <div>
        <h2>{goal.title}</h2>
        <p>{goal.completionDate}</p>
      </div>
      <div>
        <section>{goal.why}</section>
        {/* Complete button  <Link to={`/goals/${goal._id}`}> FIND WAY to switch completed BOOLEAN to true for that goal id. FIND WAY to edit goal - Maybe reuse AddGoalBtn or create a new modal similar to add goal but add update goal btn. Need data to be shown and assigned to user. */}
        <button>Edit Goal</button>
        <button>Complete</button>
      </div>
      <div>
        <section>{goal.tasks}</section>
        <button>Edit Tasks</button>
      </div>
    </div>
  )
}

export default SingleGoal;