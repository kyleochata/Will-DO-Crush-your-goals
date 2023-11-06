import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Create
import { useState } from 'react';
import { QUERY_USER,QUERY_TASK } from '../../utils/queries';
import Auth from '../../utils/auth';
import SingleTask from '../../components/TaskComponents/SingleTaskModal';

const OneTask = () => {
  const { taskId } = useParams()
  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { taskId: taskId },
  })
  const taskInfo = data?.task || {};
  // const [goalState, setGoalState] = useState(goal);
  // console.log({goalState: goalState});
  if (loading) {
    return <div>Loading...</div>
  }
  return (
      <div className="single-task">
        <SingleTask
        filteredTask={taskInfo}
        
        />
      </div>
  )
}

export default OneTask;