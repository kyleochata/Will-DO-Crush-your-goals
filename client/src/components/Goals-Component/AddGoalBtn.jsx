import React, { useState } from 'react'
import Modal from 'react-modal'
import style from './AddGoalBtn.module.css'
import { useMutation } from '@apollo/client'
import { ADD_GOAL } from '../../utils/mutations'

const AddGoalBtn = ({ createGoal }) => {
  const [showModal, setShowModal] = useState(false)
  const [goalData, setGoalData] = useState({
    title: '',
    description: '',
    completionDate: '',
    why: '',
  })

  const handleInputChange = (event) => {
    setGoalData({
      ...goalData,
      [event.target.name]: event.target.value,
    })
    // console.log(goalData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // try {
    //   const { data } = await createSingleGoal({ variables:
    //     { ...goalData }
    //   })
    //   console.log(data);
    //   // createSingleGoal(goalData);
    //   setShowModal(false);
    // } catch(err) {
    //   throw err;
    // }
    createGoal(goalData)
    // setShowModal(false)
    window.location.reload()
  }

  // Define addGoal function here.
  // const addGoal = (goal)

  return (
    <>
      <button onClick={() => setShowModal(true)} className="dashButton">
        + Add Goal
      </button>
      <Modal
        className=""
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <form className={style.addGoalModal} onSubmit={handleSubmit}>
          <label className={style.addGoalText}>
            Title:
            <input
              type="text"
              name="title"
              value={goalData.title}
              onChange={handleInputChange}
            />
          </label>
          <label className={style.addGoalText}>
            Description:
            <textarea
              name="description"
              value={goalData.description}
              onChange={handleInputChange}
            />
          </label>
          <label className={style.addGoalText}>
            Due Date:
            <input
              type="date"
              name="completionDate"
              value={goalData.completionDate}
              onChange={handleInputChange}
            />
          </label>
          <label className={style.addGoalText}>
            Why:
            <textarea
              name="why"
              value={goalData.why}
              onChange={handleInputChange}
            />
          </label>
          <button className={style.createGoalBtn} type="submit">
            Create Goal
          </button>
        </form>
      </Modal>
    </>
  )
}

export default AddGoalBtn
