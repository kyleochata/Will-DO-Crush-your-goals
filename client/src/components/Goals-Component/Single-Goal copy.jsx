import { from, useMutation } from "@apollo/client";
import { DELETE_GOAL, EDIT_GOAL } from "../../utils/mutations";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import format_date from "../../utils/helpers";
import EditGoalBtn from '../../components/Goals-Component/EditGoalBtn'
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

const SingleGoal = ({ filteredGoals }) => {
  const [deleteGoal] = useMutation(DELETE_GOAL);
  // const [goalState, setGoalState] = useState(true);
  const { goalId } = useParams();
  const goal = filteredGoals[0];
  console.log(goalId);
  console.log(goal.completionDate);
  const [editGoal, setEditGoal] = useState(false);
  console.log(filteredGoals);
  const handleDelClick = async () => {
    try {
      await deleteGoal({
        variables: { goalId: goalId },
      });
      window.location.replace("/goals");
    } catch (err) {
      console.log("catching error");
      throw err;
    }
  };

  const [goalData, setGoalData] = useState(goal);

  const handleInputChange = (event) => {
    setGoalData({
      ...goalData,
      [event.target.name]: event.target.value,
    });
    console.log(goalData);
  };

  const [changeGoal] = useMutation(EDIT_GOAL);
  const updatedGoal = (goalData) => {
    changeGoal({ variables: goalData })
      .then((response) => {
        console.log("Goal updated:", response.data.changeGoal);
      })
      .catch((error) => {
        console.error("Error updating goal:", error);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    updatedGoal(goalData);
    setEditGoal(!editGoal);
  };

  const editGoalClick = () => {
    // const [goalData, setGoalData] = useState({});
    setEditGoal(!editGoal);
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
                  <EditGoalBtn editGoal={editGoal} />
                  <button onClick={editGoalClick} className="dashButton">Edit Goal</button>
                  <button className="dashButton" >Complete</button>
                  <button onClick={handleDelClick} className="dashButton">Delete</button>
                </div>
                <div className="goalDashSpacing"></div>
                <div className="liItem">
                  <h3 className="subHeader">Description</h3>
                <p className="singlePageText">  {goalData.description}</p>
                </div>
                <div className="liItem">
                <h3 className="subHeader">Your Why</h3>
                <p className="regularText"> {goalData.why}</p>
                </div>
                <div className="liItem">
                <h3 className="subHeader">Measurables</h3>
                <p className="regularText"> {goalData.measurables}</p>
                </div>
                <div className="liItem">
                <h3 className="subHeader">Target Date</h3>
                <p className="regularText">{format_date2(goalData.completionDate)}</p>
                </div>
                <div className="liItem">
                <h3 className="subHeader">Linked Tasks</h3>
                <p className="regularText">Map over the associated tasks here once we have that logic built out</p>
                </div>
                
              </div>
            </article>
          </div>
          <div>
            {/* Complete button  <Link to={`/goals/${goal._id}`}> FIND WAY to switch completed BOOLEAN to true for that goal id. FIND WAY to edit goal - Maybe reuse AddGoalBtn or create a new modal similar to add goal but add update goal btn. Need data to be shown and assigned to user. */}
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
            <label className={style.addTaskModalTxt}>
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
            </label>
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
            <div className={style.submitButtonContainer}>
              <button
                className={style.submitButton}
                type="submit"
              >
                Edit Goal
              </button>
            </div>
          </form>
        </div>
      </div>
      )}
    </div>
  );
};

export default SingleGoal;