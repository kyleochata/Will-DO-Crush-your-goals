import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Create

import { QUERY_TASK } from '../../utils/queries';

import SingleTask from '../../components/TaskComponents/SingleTaskModal';

const OneTask = () => {
  const { taskId } = useParams()
  const { loading, data } = useQuery(QUERY_TASK, {
    variables: { taskId: taskId },
  })
  const taskInfo = data?.task || {};

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