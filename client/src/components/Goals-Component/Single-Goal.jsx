const SingleGoal = ({ goal }) => {
  return (
    <div>
      <div>
        <h2>{goal.title}</h2>
        <p>{goal.completionDate}</p>
      </div>
      <div>
        <section>{goal.why}</section>
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