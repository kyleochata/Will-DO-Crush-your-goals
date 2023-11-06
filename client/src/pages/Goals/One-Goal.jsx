import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Create
import { useState } from 'react';
import { QUERY_USER,QUERY_GOAL } from '../../utils/queries';
import Auth from '../../utils/auth';
import SingleGoal from '../../components/Goals-Component/Single-Goal';

const OneGoal = () => {
  const { goalId } = useParams();
  const auth_ID = Auth.getProfile().authenticatedPerson.authID
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { authID: auth_ID }
  });
  // set user.goals to diff variable
  // create 3rd variable to whatever goals was to .filter anon function goal => goalId = goal_id
  const goal = data?.user?.goals || [];
  console.log(goal)
  const filteredGoals = goal.filter((item) => item._id === goalId);
  console.log("where is this");
  console.log(filteredGoals);

  // const [goalState, setGoalState] = useState(goal);
  // console.log({goalState: goalState});
  if (loading) {
    return <div>Loading...</div>
  }
  return (
      <div className="single-goal">
        <SingleGoal
        filteredGoals={filteredGoals}
        
        />
      </div>
  )
}

export default OneGoal;