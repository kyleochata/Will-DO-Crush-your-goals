const SingleGoal = ({ goal }) => {
  return (
    <div>
      <h2>{goal.title}</h2>
      <p>{goal.completionDate}</p>
    </div>
  )
}

export default SingleGoal;