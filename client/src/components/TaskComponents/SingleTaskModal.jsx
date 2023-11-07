import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_TASK } from "../../utils/queries";
import { DELETE_TASK, EDIT_TASK } from "../../utils/mutations";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import format_date from "../../utils/helpers";
import "../Dashboard/Dashboard.css";
import style from "../../pages/Tasks/Tasks.module.css"
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";

const format_date2 = (timestamp) => {
	// Create a new date object using the timestamp
	const date = new Date(parseInt(timestamp));

	// Adjust for the timezone offset to get the correct GMT date
	const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

	// Extract the month, day, and year from the UTC date
	const monthNum = utcDate.getMonth();
	const day = utcDate.getDate();
	const year = utcDate.getFullYear();

	// Define the month names
	const months = [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
	];

	// Construct the formatted date string
	const formattedDate = `${months[monthNum]} ${day} ${year}`;

	// Log and return the formatted date string
	return formattedDate;
};


const SingleTask = ({ filteredTask }) => {
	const auth_ID = Auth.getProfile().authenticatedPerson.authID
	const selectRef = useRef()
	const { data } = useQuery(QUERY_USER, {
		variables: { authID: auth_ID },
	})
	const user = data?.user || {}
	const goals = user.goals;
	// const [queryTask] = useQuery(QUERY_TASK);
	// const [goalState, setGoalState] = useState(true);
	const { taskId } = useParams();
	const { data: { task } } = useQuery(QUERY_TASK, {
		variables: { taskId: taskId },
	})

	const [editTask, seteditTask] = useState(false);

	const [deleteTask] = useMutation(DELETE_TASK);

	const handleDelClick = async () => {
		if (confirm("Are you sure you want to delete?")) { // Use confirm here
			try {
				await deleteTask({
					variables: { taskId: taskId },
				});
				// Use the router's navigation method instead of window.location.replace
				// if you're using React Router or a similar library
				window.location.replace("/tasks");
			} catch (err) {
				console.log("Error deleting task:", err);
				// Handle the error appropriately
				// Throwing the error here may not be necessary unless you want a higher-level function to handle it.
			}
		}
	};


	const [taskData, settaskData] = useState(task || {});


	const handleInputChange = (event) => {
		const { name, value } = event.target;

		if (name === 'completionDate') {
			// When the input field is for completionDate, convert the value to a timestamp
			settaskData((prevState) => ({
				...prevState,
				// Convert the date string to a timestamp
				[name]: Date.parse(value),
			}));
		} else {
			settaskData((prevState) => ({
				...prevState,
				[name]: value,
			}))
		}
	};

	const [changeTask] = useMutation(EDIT_TASK, { refetchQueries: ["user", QUERY_USER, "task", QUERY_TASK] });
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

	const handleSubmit = async (event) => {
		event.preventDefault();
	  
		try {
		  const updatedTaskData = {
			...taskData,
			taskId: taskData._id,
			goal: selectRef.current.value,
		  };
	  
		  // Check if there are changes in the taskData
		  if (
			updatedTaskData.title !== task.title ||
			updatedTaskData.description !== task.description ||
			updatedTaskData.completionDate !== task.completionDate ||
			updatedTaskData.priority !== task.priority ||
			updatedTaskData.goal !== task.goal
		  ) {
			// Only update the task if there are changes
			await updatedTask(updatedTaskData);
		  }
	  
		  window.location.reload();
		  seteditTask(false);
		} catch (error) {
		  console.error("Error updating task:", error);
		}
	  };
	  

	const editTaskClick = () => {
		// const [taskData, settaskData] = useState({});
		seteditTask(!editTask);
	};

	const cancelEdit = () => {
		seteditTask(false);
	};

	const [checked, setChecked] = useState(task.completed);
	const [buttonText, setButtonText] = useState(
		task.completed ? "ReOpen" : "Complete"
	);

	const toggleCompletion = () => {
		setChecked(!checked);
		setButtonText(checked ? "Complete" : "ReOpen");
	};

	const [updateTaskCompletion] = useMutation(EDIT_TASK);

	useEffect(() => {
		if (checked !== task.completed) {
			updateTaskCompletion({
				variables: { taskId: task._id, completed: checked },
			});
		}
	}, [checked, task.completed, task._id, updateTaskCompletion]);


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
									<button onClick={toggleCompletion} className="dashButton">
										{buttonText}
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
									<p className="singlePageText">
										{" "}
										{format_date2(taskData.completionDate)}
									</p>
								</div>
								<div className="liItem">
									<h3 className="subHeader">Goal</h3>
									{!taskData.goal ? (
										<p>No Goal Assigned</p>
									) : (
										<Link to={`/goals/${taskData.goal._id}`}>
											<p className="singlePageText"> {taskData.goal.title}</p>
										</Link>
									)}
								</div>
							</div>
						</article>
					</div>
				</div>
			)}
			{editTask && (
				<div className={style.editContent}>
					<div className={style.editTitle}>EDIT TASK</div>
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
								<label className={style.addTaskModalTxt}>
									Add to Goal:
									<select
										name="goal"
										className={style.addTaskModalInput}
										ref={selectRef}
										defaultValue={taskData.goal ? taskData.goal._id : "None"}
									>
										<option value="">None</option>
										{goals.map((goal) => (
											<option key={goal._id} value={goal._id}>
												{goal.title}
											</option>
										))}
									</select>
								</label>
							</div>
							<div className={style.editButtonContainer}>
								<button className={style.editSubmitButton} type="submit">
									Update Task
								</button>
								<button className={style.editSubmitButton} onClick={cancelEdit}>
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
