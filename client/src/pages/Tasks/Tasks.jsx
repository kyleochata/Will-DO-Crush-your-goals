// import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import TasksList from '../../components/TaskComponents/TasksList.jsx';
// import PowerList from '../../components/TaskComponents/PowerList';
import SingleTask from '../../components/TaskComponents/SingleTaskModal.jsx';
import AddTaskBtn from '../../components/TaskComponents/AddTaskBtn.jsx';
import { ADD_TASK } from '../../utils/mutations';

import Auth from '../../utils/auth';

import { QUERY_USER } from '../../utils/queries';

function Tasks() {
  const [addTask] = useMutation(ADD_TASK);
  const createTask = (taskData) => {
    addTask({ variables: taskData })
        .then((response) => {
            console.log("Task created:", response.data.addTask);
        })
        .catch((error) => {
            console.error("Error creating task:", error);
        });
};
const auth_ID = Auth.getProfile().authenticatedPerson.authID;
console.log(auth_ID)
  // might need to use auth0_id instead of userId
  // const { authId } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { authID: auth_ID }
  });

  // const user = data?.user || {};
  // console.log(data);

  if (!data) {
    console.log('no user found')
  }

  else {
    console.log(data);
  }

  
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
		<div>
      All Tasks
      <AddTaskBtn createTask={createTask} />
      power list here
      {/* task list card */}
      <TasksList />
      {/* single task modal */}
      <SingleTask />
		</div>
	);
}
export default Tasks