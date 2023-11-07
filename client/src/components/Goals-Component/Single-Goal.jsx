import { useMutation } from "@apollo/client";
import { DELETE_GOAL, EDIT_GOAL, ADD_MEASURABLE } from '../../utils/mutations';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import format_date from "../../utils/helpers";
import "../Dashboard/Dashboard.css";
import style from "../../pages/Tasks/Tasks.module.css"

const format_date2 = (timestamp) => {
  //month is index 0-11. must add 1 to get correct month
  let timeStamp = new Date(parseInt(timestamp))
  let monthNum = timeStamp.getMonth()
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  let currentMonth = months[monthNum]
  let day = timeStamp.getDate()
  let year = timeStamp.getFullYear()

  return `${currentMonth} ${day} ${year}`
}

const SingleGoal = ({ goalInfo }) => {
  const [deleteGoal] = useMutation(DELETE_GOAL)
  // const [goalState, setGoalState] = useState(true);
  const { goalId } = useParams()
  const goal = goalInfo
  console.log(goalId)
  console.log(goal.completionDate)
  const [editGoal, setEditGoal] = useState(false)
  console.log(goalInfo)
  const [addMeasurable] = useMutation(ADD_MEASURABLE)
  const handleDelClick = async () => {
    try {
      await deleteGoal({
        variables: { goalId: goalId },
      })
      window.location.replace('/goals')
    } catch (err) {
      console.log('catching error')
      throw err
    }
  }

  const [goalData, setGoalData] = useState(goal)

  useEffect(() => {
    if (!goalData.measurables) {
      setGoalData((prevGoalData) => ({
        ...prevGoalData,
        measurables: "",
      }))
    }
  }, [goalData, setGoalData])

  console.log('here')
  console.log(goalData)

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'completionDate') {
      // When the input field is for completionDate, convert the value to a timestamp
      setGoalData((prevState) => ({
        ...prevState,
        // Convert the date string to a timestamp
        [name]: Date.parse(value),
      }));
    } else {
      setGoalData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const [changeGoal] = useMutation(EDIT_GOAL)
  const updatedGoal = (goalData) => {
    const goalDataWithDateString = {
      ...goalData,
      completionDate: format_date(goalData.completionDate),
    };

    changeGoal({ variables: goalDataWithDateString })
      .then((response) => {
        console.log('Goal updated:', response.data.changeGoal)
      })
      .catch((error) => {
        console.error('Error updating goal:', error)
      })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    goalData.goalId = goalData._id
    updatedGoal(goalData)
    setEditGoal(!editGoal)
  }

  const [checked, setChecked] = useState(goal.completed);
  const [buttonText, setButtonText] = useState(
    goal.completed ? "ReOpen" : "Complete"
  );

  const toggleCompletion = () => {
    setChecked(!checked);
    setButtonText(checked ? "Complete" : "ReOpen");
  };

  const [updateGoalCompletion] = useMutation(EDIT_GOAL);

  useEffect(() => {
    if (checked !== goal.completed) {
      updateGoalCompletion({
        variables: { goalId: goal._id, completed: checked },
      });
    }
  }, [checked, goal.completed, goal._id, updateGoalCompletion]);

  const addMeasurableClick = async (event) => {
    event.preventDefault()
    const measurableToAdd = prompt('Enter new measurable:') // Simple prompt for demo, consider a better UI for production
    if (measurableToAdd) {
      try {
        const { data } = await addMeasurable({
          variables: {
            goalId: goalData._id,
            title: measurableToAdd,
          },
        })
        if (data) {
          setGoalData((prevState) => ({
            ...prevState,
            measureables: [...prevState.measureables, measurableToAdd],
          }))
        }
      } catch (err) {
        console.error('Error adding measurable', err)
      }
    }
  }

  const editGoalClick = () => {
    // const [goalData, setGoalData] = useState({});
    setEditGoal(!editGoal);
  };

  const cancelEdit = () => {
    setEditGoal(false);
  };

  return (
    <div>
      {!editGoal && (
        <div className="singlePageMain">
          <div className="cards">
            <article className="oneCard">
              <div className="cardText textAlign">
                <h2 className="singlePageTitle">{goalData.title}</h2>
                <div className="dashButtonContainer">
                  <button onClick={editGoalClick} className="dashButton">
                    Edit Goal
                  </button>
                  <button onClick={toggleCompletion} className="dashButton">{buttonText}</button>
                  <button onClick={handleDelClick} className="dashButton">
                    Delete
                  </button>
                </div>
                <div className="goalDashSpacing"></div>
                <div className="liItem">
                  <h3 className="subHeader">Description</h3>
                  <p className="singlePageText"> {goalData.description}</p>
                </div>
                <div className="liItem">
                  <h3 className="subHeader">Your Why</h3>
                  <p className="singlePageText"> {goalData.why}</p>
                </div>
                {/* <div className="liItem">
                  <h3 className="subHeader">Measurables</h3>
                  <p className="singlePageText"> {goalData.measurables}</p>
                </div> */}
                <div className="liItem">
                  <h3 className="subHeader">Target Date</h3>
                  <p className="singlePageText">
                    {format_date2(goalData.completionDate)}
                  </p>
                </div>
                <div className="liItem">
                  <h3 className="subHeader">Linked Tasks</h3>
                  {goalData.tasks.map((task) => (
                    <Link to={`/tasks/${task._id}`}>
                      <p key={task._id} value={task._id}className="singlePageText">{task.title}</p>
                    </Link>
                  )
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
      {editGoal && (
        <div className={style.editContent}>
          <div className={style.editTitle}>EDIT GOAL</div>
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
                    value={format_date(goalData.completionDate)}
                    onChange={handleInputChange}
                    className={style.addTaskModalInput}
                    required
                  />
                </label>
              </div>
              <div className={style.editButtonContainer}>
                <button
                  className={style.editSubmitButton}
                  type="submit"
                >
                  Edit Goal
                </button>
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
  )
}

export default SingleGoal
