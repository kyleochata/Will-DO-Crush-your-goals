import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TasksList from '../../components/TaskComponents/TasksList.jsx';
// import PowerList from '../../components/TaskComponents/PowerList';
import SingleTask from '../../components/TaskComponents/SingleTaskModal.jsx';
import AddTaskBtn from '../../components/TaskComponents/AddTaskBtn.jsx';

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
      <AddTaskBtn />
      power list here
      {/* task list card */}
      <TasksList tasks={user.tasks} />
      {/* single task modal */}
      <SingleTask />
		</div>
	);
}
export default Tasks