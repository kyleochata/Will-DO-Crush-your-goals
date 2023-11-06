// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import Modal from "react-modal";

// import { QUERY_TASK } from "../../utils/queries";

// const SingleTask = () => {
// 	const { taskId: taskId } = useParams();

// 	const { loading, data } = useQuery(QUERY_TASK, {
// 		variables: { taskId: taskId },
// 	});

// 	const task = data?.task || {};
// 	const [modalIsOpen, setModalIsOpen] = useState(false);

// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}

// 	return (
// 		<div>
// 			<h2 onClick={() => setModalIsOpen(true)}>{task.title}</h2>
// 			<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
// 				<h2>{task.title}</h2>
// 				{/* add functionality to complete button */}
// 				<button>Mark as Completed</button>
// 				<p>{task.description}</p>
// 				<p>{task.completionDate}</p>
// 				<p>{task.priority}</p>
// 				{/* add functionality to edit task and delete task buttons */}
// 				<button>Edit Task</button>
// 				<button>Delete Task</button>
// 				<button onClick={() => setModalIsOpen(false)}>Close</button>
// 			</Modal>
// 		</div>
// 	);
// };

// export default SingleTask;


import { from, useMutation, useQuery } from '@apollo/client';
import { QUERY_TASK } from '../../utils/queries';
import { DELETE_TASK, EDIT_TASK } from '../../utils/mutations';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import format_date from '../../utils/helpers';

const SingleTask = ({ filteredTask }) => {
	const [deleteTask] = useMutation(DELETE_TASK);
	// const [queryTask] = useQuery(QUERY_TASK);
	// const [goalState, setGoalState] = useState(true);
	const { taskId } = useParams();
	const task = filteredTask[0];
	const [editTask, seteditTask] = useState(false);
	const handleDelClick = async () => {
		try {
			await deleteTask({
				variables: { taskId: taskId }
			});
			window.location.replace('/tasks');
		} catch (err) {
			console.log("catching error")
			throw err;
		}
	}

	const [taskData, settaskData] = useState(task);

	// console.log(format_date(taskData.completionDate));

	// const handleInputChange = (event) => {
	// 	settaskData({
	// 		...taskData,
	// 		[event.target.name]: event.target.value,
	// 	});
	// 	console.log(taskData);
	// };

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		settaskData((prevState) => {
			console.log('Old state:', prevState);
			console.log('New value for', name, ':', value);

			return {
				...prevState,
				[name]: value,
			};
		});
	};


	const [changeTask] = useMutation(EDIT_TASK);
	const updatedTask = (taskData) => {
		changeTask({ variables: taskData })
			.then((response) => {
				console.log('Task updated:', response.data.changeTask)
			})
			.catch((error) => {
				console.error('Error updating task:', error)
			})
	}
	// const handleSubmit = async (event) => {
	// 	event.preventDefault();
	// 	updatedTask(taskData);
	// 	seteditTask(!editTask);
	// };

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		try {
			taskData.taskId = taskData._id;
			await updatedTask(taskData);
			seteditTask(false); // I changed this to false to close the edit form on submit
			// You might want to refetch task data here if needed
		} catch (error) {
			console.error('Error updating task:', error);
			// Update UI to show error message
		}
	};


	const editTaskClick = () => {
		// const [taskData, settaskData] = useState({});
		seteditTask(!editTask);
		
	}

	return (
		<div>
			{!editTask && (
				<div>
					<div>
						<h2>{taskData.title}</h2>
						<p>{format_date(taskData.completionDate)}</p>
						<p>{taskData.description}</p>
					</div>
					<div>
						<section>{taskData.priority}</section>
						{/* Complete button  <Link to={`/goals/${goal._id}`}> FIND WAY to switch completed BOOLEAN to true for that goal id. FIND WAY to edit goal - Maybe reuse AddGoalBtn or create a new modal similar to add goal but add update goal btn. Need data to be shown and assigned to user. */}
						<button
							onClick={editTaskClick}
						>Edit Task</button>
						<button>Complete</button>
						<button
							onClick={handleDelClick}
						>Delete</button>
					</div>
				</div>
			)}
			{editTask && (<form
				onSubmit={handleSubmit}
			>
				<div>
					<label>
						Title:
						<div>A broad overview of your task. "Learn to develop web applications"</div>
						<input
							placeholder="Your Task Title"
							type="text"
							name="title"
							value={taskData.title}
							onChange={handleInputChange}
							required
						/>
					</label>
					<br></br>
					<label>
						Description:
						<div>Be specific with your task. "Become a full stack developer specializing in JS" </div>
						<textarea
							placeholder="Give some specifics about your goal here"
							name="description"
							value={taskData.description}
							onChange={handleInputChange}
							required
						/>
					</label>
					<br></br>
					<label>
						Due Date:
						{/* <div>Making your goals time-bound provides a sense of urgency and a clear deadline, motivating you to take action and track your progress </div> */}
						<div></div>
						<input
							type="date"
							name="completionDate"
							value={format_date(taskData.completionDate)}
							onChange={handleInputChange}
							required
						/>
					</label>
					<br></br>
					<label>
						Priority:
						{/* <div>How important is this task? Choose Low, Medium, or High.</div> */}
						<div></div>
						<select
							name="priority"
							value={taskData.priority}
							onChange={handleInputChange}
							required
						>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
						</select>
					</label>


					{/* <label>
						Due Date:
						<div>Making your goals time-bound provides a sense of urgency and a clear deadline, motivating you to take action and track your progress </div>
						<input
							type="date"
							name="completionStatus"
							value={format_date(taskData.completed)}
							onChange={handleInputChange}
							required
						/>
					</label> */}
				</div>
				<div>
					<button type="submit"
					>
						Update Task
					</button>
				</div>
			</form>)}
		</div>
	)
}

export default SingleTask;
