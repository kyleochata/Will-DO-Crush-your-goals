import React, { useState } from 'react';
import Modal from 'react-modal';

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
      <button onClick={() => setShowModal(true)}>Add Task</button>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={taskData.title} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={taskData.description} onChange={handleInputChange} />
          </label>
          <label>
            Due Date:
            <input type="date" name="completionDate" value={taskData.completionDate} onChange={handleInputChange} />
          </label>
          <label>
            Priority:
            <select name="priority" value={taskData.priority} onChange={handleInputChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <button type="submit">Create Task</button>
        </form>
      </Modal>
    </>
  );
};

export default AddTaskBtn;
