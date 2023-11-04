import React, { useState } from 'react';
import Modal from 'react-modal';
import { useMutation } from '@apollo/client';

import { ADD_TASK } from '../../utils/mutations';

import style from "../../pages/Tasks/Tasks.module.css";

const AddTaskBtn = ({ createTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    completionDate: '',
    priority: ''
  });

  const handleInputChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask(taskData);
    setShowModal(false);
  };

  return (
		<>
			<button onClick={() => setShowModal(true)} className="dashButton">+ Add Task</button>
			<Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
				<form onSubmit={handleSubmit} className={style.addTaskForm}>
					<label className={style.addTaskModalTxt}>
						Title:
						<input
							type="text"
							name="title"
							value={taskData.title}
							onChange={handleInputChange}
							className={style.addTaskModalInput}
						/>
					</label>
					<label className={style.addTaskModalTxt}>
						Description:
						<textarea
							name="description"
							value={taskData.description}
							onChange={handleInputChange}
							className={style.addTaskModalInput}
						/>
					</label>
					<label className={style.addTaskModalTxt}>
						Due Date:
						<input
							type="date"
							name="completionDate"
							value={taskData.completionDate}
							onChange={handleInputChange}
							// className={style.addTaskModalInput}
						/>
					</label>
					<label className={style.addTaskModalTxt}>
						Priority:
						<select
							name="priority"
							value={taskData.priority}
							onChange={handleInputChange}
							className={style.addTaskModalInput}
						>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
						</select>
          </label>
          <label></label>
					<button type="submit">Create Task</button>
				</form>
			</Modal>
		</>
	);
};

export default AddTaskBtn;
