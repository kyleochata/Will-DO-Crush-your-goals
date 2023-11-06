import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../../utils/auth";
import { QUERY_USER } from "../../utils/queries";
import { DELETE_TASK } from "../../utils/mutations";


const OneTask = () => {
	const { taskId } = useParams();
	const auth_ID = Auth.getProfile().authenticatedPerson.authID;
	// console.log(auth_ID);
	const { data } = useQuery(QUERY_USER, {
		variables: { authID: auth_ID }
	});
	// console.log(data);
	const user = data?.user?.tasks || [];
	// console.log(user);
	const taskInfo = user.filter((task) => task._id === taskId);
// console.log(taskInfo)
	const task = taskInfo[0];
	// console.log(task);
	const [deleteTask] = useMutation(DELETE_TASK);

	const handleDeleteTask = async () => {
		try {
			await deleteTask({
				variables: { taskId: taskId },
			});
			window.location.replace('/tasks');
		} catch (err) {
			console.error(err);
		}
	};
	
	return (
		<div>
				<h2>{task.title}</h2>
				{/* add functionality to complete button */}
				<button>Mark as Completed</button>
				<p>{task.description}</p>
				<p>{task.completionDate}</p>
				<p>{task.priority}</p>
				{/* add functionality to edit task and delete task buttons */}
				<button>Edit Task</button>
				<button onClick={handleDeleteTask}>Delete Task</button>
		</div>
	);
};

export default OneTask;
