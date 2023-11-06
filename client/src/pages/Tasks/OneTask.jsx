import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Create
import { useState } from 'react';
import { QUERY_USER } from '../../utils/queries';
import Auth from '../../utils/auth';
import SingleTask from '../../components/TaskComponents/SingleTaskModal';

const OneTask = () => {
  const { taskId } = useParams();
  const auth_ID = Auth.getProfile().authenticatedPerson.authID
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { authID: auth_ID }
  });
  // set user.goals to diff variable
  // create 3rd variable to whatever goals was to .filter anon function goal => goalId = goal_id
  const tasks = data?.user?.tasks || [];
  console.log(tasks)
  const filteredTask = tasks.filter((item) => item._id === taskId);
  console.log(filteredTask);

  // const [goalState, setGoalState] = useState(goal);
  // console.log({goalState: goalState});
  if (loading) {
    return <div>Loading...</div>
  }
  return (
      <div className="single-task">
        <SingleTask
        filteredTask={filteredTask}
        
        />
      </div>
  )
}

export default OneTask;