import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useMutation } from '@apollo/client'

import { ADD_TASK } from '../../utils/mutations'

import style from '../../pages/Tasks/Tasks.module.css'

const AddTaskBtn = ({ createTask, goals }) => {
	const [showModal, setShowModal] = useState(false)
	const [taskData, setTaskData] = useState({
		title: '',
		description: '',
		completionDate: '',
		priority: 'Low',
		goal: '',
	})
	// const [createSingleTask, {err}] = useMutation(ADD_TASK);
	// TEST
	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setTaskData((prevState) => {
			console.log('Old state:', prevState);
			console.log('New value for', name, ':', value);

			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createTask(taskData);
		setTaskData({
			// Reset the form fields to empty values
			title: "",
			description: "",
			completionDate: "",
			priority: "Low",
		});
		setShowModal(false);
		window.location.reload();
	};


	return (
		<>
			<button onClick={() => setShowModal(true)} className="dashButton">
				+ Add Task
			</button>
			<Modal
				isOpen={showModal}
				onRequestClose={() => setShowModal(false)}
				className={style.addTaskModal}>
				<button
					className={style.closeButton}
					onClick={() => setShowModal(false)}>
					X
				</button>
				<div className={style.modalContent}>
					<div className={style.modalTitle}>ADD TASK</div>
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
										placeholder="Details About Your Task"
										name="description"
										value={taskData.description}
										onChange={handleInputChange}
										className={style.addTaskModalInput}
										required
									/>
								</label>
								<label className={style.addTaskModalTxt}>
									Due Date:
									<input
										type="date"
										name="completionDate"
										value={taskData.completionDate}
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
										name="goalId"
										value={taskData.goal} // Make sure this reflects the 'goal' in taskData
										onChange={handleInputChange} // Use the same change handler which updates taskData
										className={style.addTaskModalInput}
									>
										<option value="">None</option> {/* This is the new empty option */}
										{goals.map((goal) => (
											<option value={goal._id}>{goal.title}</option>
										))}
									</select>
								</label>
								<label className={style.addTaskModalTxt}>
									Add to Measurable:
									<select
										name="measurableId"
										value={taskData.measurable} // Make sure this reflects the 'goal' in taskData
										onChange={handleInputChange} // Use the same change handler which updates taskData
										className={style.addTaskModalInput}
									>
										<option value="">None</option> {/* need new logic to get query goal */}
										{goals.map((goal) => (
											<option value={goal._id}>{goal.title}</option>
										))}
									</select>
								</label>
							</div>
							<div className={style.submitButtonContainer}>
								<button type="submit" className={style.submitButton}>
									Create Task
								</button>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</>
	);
};

AddTaskBtn.defaultProps = {
	goals: [],
	measurables:[],
};


export default AddTaskBtn
