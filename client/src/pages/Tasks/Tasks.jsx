import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import TasksList from "../../components/TaskComponents/TasksList.jsx";
// import PowerList from '../../components/TaskComponents/PowerList';
import SingleTask from "../../components/TaskComponents/SingleTaskModal.jsx";
import AddTaskBtn from "../../components/TaskComponents/AddTaskBtn.jsx";
import { ADD_TASK } from "../../utils/mutations";
import Auth from "../../utils/auth";
import style from "./Tasks.module.css";
import { QUERY_USER } from "../../utils/queries";
// import { useState, useEffect } from "react";

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

  // might need to use auth0_id instead of userId
  const auth_ID = Auth.getProfile().authenticatedPerson.authID;
  console.log("query plz");
  console.log(auth_ID);
    const { data } = useQuery(QUERY_USER, {
    variables: { authID: auth_ID }
  });

  console.log(auth_ID)
	const user = data?.user || {};
  console.log(data);
  console.log(user);

	return (
		<div className={style.mainTask}>
			<section className="cards">
				<article className="oneCard">
					<h2 className="cardTitle">ALL TASKS</h2>
					{/* task list card */}
					<TasksList tasks={user.tasks} />
					<div className="dashButtonContainer">
            <AddTaskBtn
              createTask={createTask}
							goals={user.goals}
            />
					</div>
				</article>
			</section>

			{/* single task modal commenting out SingleTask as it seemed to be causing some issues and wasn't fully built out to be a modal*/}
			<SingleTask />
		</div>
	);
}
export default Tasks;
