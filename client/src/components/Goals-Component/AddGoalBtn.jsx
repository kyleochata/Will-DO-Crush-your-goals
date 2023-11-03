import React, { useState } from 'react';
import Modal from 'react-modal';

const AddGoalBtn = ({ createGoal }) => {
  const [showModal, setShowModal] = useState(false);
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    completionDate: '',
    why: ''
  });

  const handleInputChange = (event) => {
    setGoalData({
      ...goalData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createGoal(goalData);
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Goal</button>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={goalData.title} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={goalData.description} onChange={handleInputChange} />
          </label>
          <label>
            Due Date:
            <input type="date" name="completionDate" value={goalData.completionDate} onChange={handleInputChange} />
          </label>
          <label>
            Why:
            <textarea name="why" value={goalData.why} onChange={handleInputChange} />
          </label>
          <button type="submit">Create Goal</button>
        </form>
      </Modal>
    </>
  )
}

export default AddGoalBtn;