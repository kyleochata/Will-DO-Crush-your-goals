import React, { useState } from 'react'
import Modal from 'react-modal'
import style from '../../pages/Tasks/Tasks.module.css'
import { useMutation } from '@apollo/client'
import { ADD_GOAL } from '../../utils/mutations'

const AddGoalBtn = ({ createGoal }) => {
  const [showModal, setShowModal] = useState(false)
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    why: "",
    completionDate: "",
  });

  const handleInputChange = (event) => {
    setGoalData({
      ...goalData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createGoal(goalData);
    setGoalData({
      // Reset the form fields to empty values
      title: "",
      description: "",
      why: "",
      completionDate: "",
    });
    setShowModal(false);
    window.location.reload();
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="dashButton">
        + Add Goal
      </button>
      <Modal
        className={style.addTaskModal}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <button
          className={style.closeButton}
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <div className={style.modalContent}>
          <div className={style.modalTitle}>ADD GOAL</div>
          <div className={style.formContainer}>
          <form onSubmit={handleSubmit} className={style.addTaskForm}>
            <div className={style.formInputs}>
              <label className={style.addTaskModalTxt}>
                Title:
                <div className={style.goalDesc}>A broad overview of your goal. "Learn to develop web applications"</div>
                <input
                  placeholder="Your Goal Title"
                  type="text"
                  name="title"
                  value={goalData.title}
                  onChange={handleInputChange}
                  className={style.addTaskModalInput}
                  required
                />
              </label>
              <label className={style.addTaskModalTxt}>
                Description:
                <div className={style.goalDesc}>Be specific with your goal. "Become a full stack developer specializing in JS" </div>
                <textarea
                  placeholder="Give some specifics about your goal here"
                  name="description"
                  value={goalData.description}
                  onChange={handleInputChange}
                  className={style.addTaskModalInput}
                  required
                />
              </label>
              <label className={style.addTaskModalTxt}>
                Why:
                <div className={style.goalDesc}>Make it relevant. "Becoming a full-stack web developer aligns with my career aspirations and will open up job opportunities in a field that I'm passionate about."  </div>
                <textarea
                  placeholder="What's your why?"
                  name="why"
                  value={goalData.why}
                  onChange={handleInputChange}
                  className={style.addTaskModalInput}
                  required
                />
                </label>
              {/* <label className={style.addTaskModalTxt}>
                Measurables
                <div className={style.goalDesc}>Give quantifiable examples of how you will know your goal is completed. "Complete a full stack web bootcamp, build a portfolio, contribute to at least 3 open source Githubs, build at least 5 MERN applications" </div>
                <textarea
                placeholder="What metrics will help you know your goal is complete?"
                  name="measureables"
                  value={goalData.measureables}
                  onChange={handleInputChange}
                  className={style.addTaskModalInput}
                  required
                />
              </label> */}
              <label className={style.addTaskModalTxt}>
                Due Date:
                <div className={style.goalDesc}>Making your goals time-bound provides a sense of urgency and a clear deadline, motivating you to take action and track your progress </div>
                <input
                  type="date"
                  name="completionDate"
                  value={goalData.completionDate}
                  onChange={handleInputChange}
                  className={style.addTaskModalInput}
                  required
                />
              </label>
              </div>
              <div className={style.submitButtonContainer}>
              <button
                className={style.submitButton}
                type="submit"
              >
                Create Goal
              </button>
              </div>
          </form>
          </div>
          </div>
      </Modal>
    </>
  );
};

export default AddGoalBtn
