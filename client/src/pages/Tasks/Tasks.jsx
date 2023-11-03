import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TasksList from '../../components/TaskComponents/TasksList.jsx';
// import PowerList from '../../components/TaskComponents/PowerList';

// import Auth from '../../utils/auth';

import { QUERY_USER } from '../../utils/queries';

function Tasks() {
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId }
  });

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
		<div>
      All Tasks
      {/* need to add functionality to button, bring up modal when clicked */}
      <button className='add-task-btn'>+ Add Task</button>
      power list here
      <TasksList tasks={user.tasks} />
		</div>
	);
}
export default Tasks