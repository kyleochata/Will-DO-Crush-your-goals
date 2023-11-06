import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Modal from "react-modal";

import { QUERY_SINGLE_TASK } from "../../utils/queries";

const SingleTask = () => {
	const { taskId: taskId } = useParams();

	const { loading, data } = useQuery(QUERY_SINGLE_TASK, {
		variables: { taskId: taskId },
	});

	const task = data?.task || {};
	const [modalIsOpen, setModalIsOpen] = useState(false);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2 onClick={() => setModalIsOpen(true)}>{task.title}</h2>
			<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
				<h2>{task.title}</h2>
				{/* add functionality to complete button */}
				<button>Mark as Completed</button>
				<p>{task.description}</p>
				<p>{task.completionDate}</p>
				<p>{task.priority}</p>
				{/* add functionality to edit task and delete task buttons */}
				<button>Edit Task</button>
				<button>Delete Task</button>
				<button onClick={() => setModalIsOpen(false)}>Close</button>
			</Modal>
		</div>
	);
};

export default SingleTask;
