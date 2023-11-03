import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import style from '../../pages/Tasks/Tasks.module.css';

import { QUERY_SINGLE_TASK } from "../../utils/queries";

const SingleTask = () => {
	const { taskId: taskId } = useParams();

	const { loading, data } = useQuery(QUERY_SINGLE_TASK, {
		variables: { taskId: taskId },
	});

	const task = data?.task || {};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={style.singleTaskModal}>
      <h2>{task.title}</h2>
      {/* add functionality to complete button */}
      <button className={style.completedBtn}>Mark as Completed</button>
      <p>Description: {task.description}</p>
      <p>Due Date: {task.completionDate}</p>
      <p>Priority: {task.priority}</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad reprehenderit consequatur itaque mollitia eveniet dolores quaerat odio reiciendis tenetur sed earum provident dolore ratione impedit, nesciunt vero quod, delectus praesentium.</p>
      {/* add functionality to edit task and delete task buttons */}
      <button className={style.bottomBtn}>Edit Task</button>
      <button className={style.bottomBtn}>Delete Task</button>
		</div>
	);
};

export default SingleTask;