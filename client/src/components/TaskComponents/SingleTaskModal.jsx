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

import { from, useMutation, useQuery } from "@apollo/client";
import { QUERY_TASK } from "../../utils/queries";
import { DELETE_TASK, EDIT_TASK } from "../../utils/mutations";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import format_date from "../../utils/helpers";
import "../Dashboard/Dashboard.css";
import style from "../../pages/Tasks/Tasks.module.css"

const format_date2 = (timestamp) => {
	//month is index 0-11. must add 1 to get correct month
	let timeStamp = new Date(parseInt(timestamp));
	let monthNum = timeStamp.getMonth();
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	let currentMonth = months[monthNum];
	let day = timeStamp.getDate();
	let year = timeStamp.getFullYear();

	return `${currentMonth} ${day}, ${year}`;
};

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
				variables: { taskId: taskId },
			});
			window.location.replace("/tasks");
		} catch (err) {
			console.log("catching error");
			throw err;
		}
	};

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
			console.log("Old state:", prevState);
			console.log("New value for", name, ":", value);

			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const [changeTask] = useMutation(EDIT_TASK);
	const updatedTask = (taskData) => {
		const taskDataWithDateString = {
			...taskData,
			completionDate: format_date(taskData.completionDate),
		  };

		changeTask({ variables: taskDataWithDateString })
			.then((response) => {
				console.log("Task updated:", response.data.changeTask);
			})
			.catch((error) => {
				console.error("Error updating task:", error);
			});
	};
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
			console.error("Error updating task:", error);
			// Update UI to show error message
		}
	};

	const editTaskClick = () => {
		// const [taskData, settaskData] = useState({});
		seteditTask(!editTask);
	};

	const cancelEdit = () => {
		seteditTask(false);
	  };

	return (
		<div>
			{!editTask && (
				<div className="singlePageMain">
					<div className="cards">
						<article className="oneCard">
							<div className="cardText textAlign">
								<h2 className="singlePageTitle">{taskData.title}</h2>
								<div className="dashButtonContainer">
									<button onClick={editTaskClick} className="dashButton">
										Edit Task
									</button>
									<button className="dashButton">
										Complete
									</button>
									<button onClick={handleDelClick} className="dashButton">
										Delete
									</button>
								</div>
								<div className="goalDashSpacing"></div>
								<div className="liItem">
									<h3 className="subHeader">Description</h3>
									<p className="singlePageText"> {taskData.description}</p>
								</div>
								<div className="liItem">
									<h3 className="subHeader">Priority</h3>
									<p className="singlePageText"> {taskData.priority}</p>
								</div>
								<div className="liItem">
									<h3 className="subHeader">Target Date</h3>
									<p className="singlePageText"> {format_date2(taskData.completionDate)}</p>
								</div>
							</div>
						</article>
					</div>
				</div>
			)}
			{editTask && (
				<div className={style.editContent}>
				<div className={style.editTitle}>EDIT GOAL</div>
				<div className={style.formContainer}>
				<form onSubmit={handleSubmit} className={style.addTaskForm}>
					<div className={style.formInputs}>
						<label className={style.addTaskModalTxt}>
							Title:
							<input
								placeholder="Your Task Title"
								type="text"
								name="title"
								value={taskData.title}
								onChange={handleInputChange}
								className={style.addTaskModalInput}
								required
							/>
						</label>
						<label className={style.addTaskModalTxt}>
							Description:
							<textarea
								placeholder="Give some specifics about your goal here"
								name="description"
								value={taskData.description}
								onChange={handleInputChange}
								className={style.addTaskModalInput}
								required
							/>
						</label>
						<label className={style.addTaskModalTxt}>
							Target Date:
							<input
								type="date"
								name="completionDate"
								value={format_date(taskData.completionDate)}
								onChange={handleInputChange}
								className={style.addTaskModalInput}
								required
							/>
						</label>
						<label className={style.addTaskModalTxt}>
							Priority:
							<select
								name="priority"
								value={taskData.priority}
								onChange={handleInputChange}
								className={style.addTaskModalInput}
								required
							>
								<option value="Low">Low</option>
								<option value="Medium">Medium</option>
								<option value="High">High</option>
							</select>
						</label>
					</div>
					<div className={style.editButtonContainer}>
						<button className={style.editSubmitButton} type="submit" >Update Task</button>
						<button
                className={style.editSubmitButton}
                onClick={cancelEdit}
              >
                Cancel
              </button>
					</div>
				</form>
				</div>
				</div>
			)}
		</div>
	);
};

export default SingleTask;
