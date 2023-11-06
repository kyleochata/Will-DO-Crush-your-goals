import { from, useMutation } from '@apollo/client';
import { DELETE_GOAL, EDIT_GOAL,ADD_MEASURABLE } from '../../utils/mutations';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import format_date from '../../utils/helpers';

const SingleGoal = ({ filteredGoals }) => {
  const [deleteGoal] = useMutation(DELETE_GOAL);
  // const [goalState, setGoalState] = useState(true);
  const { goalId } = useParams();
  const goal = filteredGoals[0];
  console.log(goalId);
  console.log(goal.completionDate)
  const [editGoal, setEditGoal] = useState(false);
  console.log(filteredGoals);
  const [addMeasurable] = useMutation(ADD_MEASURABLE);
  const handleDelClick = async () => {
    try {
      await deleteGoal({
        variables: { goalId: goalId }
      });
      window.location.replace('/goals');
    } catch (err) {
      console.log("catching error")
      throw err;
    }
  }

  const [goalData, setGoalData] = useState(goal);


  useEffect(() => {
    if (!goalData.measurables) {
      setGoalData((prevGoalData) => ({
        ...prevGoalData,
        measurables: []
      }));
    }
  }, [goalData, setGoalData]);

  console.log("here");
  console.log(goalData);


  // const handleInputChange = (event) => {
  //   setGoalData({
  //     ...goalData,
  //     [event.target.name]: event.target.value,
  //   });
  //   console.log(goalData);
  // };

  const handleInputChange = (event) => {
    const { name, value, options } = event.target;

    if (event.target.multiple) {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setGoalData(prevState => ({
        ...prevState,
        [name]: selectedValues,
      }));
    } else {
      setGoalData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };



  const [changeGoal] = useMutation(EDIT_GOAL);
  const updatedGoal = (goalData) => {
    changeGoal({ variables: goalData })
      .then((response) => {
        console.log('Goal updated:', response.data.changeGoal)
      })
      .catch((error) => {
        console.error('Error updating goal:', error)
      })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    goalData.goalId = goalData._id;
    updatedGoal(goalData);
    setEditGoal(!editGoal);
  };


  const addMeasurableClick = async (event) => {
    event.preventDefault();
    const measurableToAdd = prompt("Enter new measurable:"); // Simple prompt for demo, consider a better UI for production
    if (measurableToAdd) {
      try {
        const { data } = await addMeasurable({
          variables: {
            goalId: goalData._id,
            title: measurableToAdd
          }
        });
        if (data) {
          setGoalData(prevState => ({
            ...prevState,
            measureables: [...prevState.measureables, measurableToAdd],
          }));
        }
      } catch (err) {
        console.error("Error adding measurable", err);
      }
    }
  };

  const editGoalClick = () => {
    // const [goalData, setGoalData] = useState({});
    setEditGoal(!editGoal);
  }

  return (
    <div>
      {!editGoal && (
        <div>
          <div>
            <h2>{goalData.title}</h2>
            <p>{goalData.completionDate}</p>
            <p>{goalData.description}</p>
          </div>
          <div>
            <section>{goalData.why}</section>
            {/* Complete button  <Link to={`/goals/${goal._id}`}> FIND WAY to switch completed BOOLEAN to true for that goal id. FIND WAY to edit goal - Maybe reuse AddGoalBtn or create a new modal similar to add goal but add update goal btn. Need data to be shown and assigned to user. */}
            <button
              onClick={editGoalClick}
            >Edit Goal</button>
            <button>Complete</button>
            <button
              onClick={handleDelClick}
            >Delete</button>
          </div>
          <div>
            <section>{goalData.tasks}</section>
            <button>Edit Tasks</button>
          </div>
          <div>
            <section>heres for you to add measurables</section>
            <button onClick={addMeasurableClick}>Add Measurables</button>
          </div>
        </div>
      )}
      {editGoal && (<form
        onSubmit={handleSubmit}
      >
        <div>
          <label>
            Title:
            <div>A broad overview of your goal. "Learn to develop web applications"</div>
            <input
              placeholder="Your Goal Title"
              type="text"
              name="title"
              value={goalData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <br></br>
          <label>
            Description:
            <div>Be specific with your goal. "Become a full stack developer specializing in JS" </div>
            <textarea
              placeholder="Give some specifics about your goal here"
              name="description"
              value={goalData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <br></br>
          <label>
            Why:
            <div>Make it relevant. "Becoming a full-stack web developer aligns with my career aspirations and will open up job opportunities in a field that I'm passionate about."  </div>
            <textarea
              placeholder="What's your why?"
              name="why"
              value={goalData.why}
              onChange={handleInputChange}
              required
            />
          </label>
          <br></br>
          <label>
            Measurables:
            <div>Give quantifiable examples of how you will know your goal is completed.</div>
            <select
              name="measureables"
              value={goalData.measureables}
              onChange={handleInputChange}
              multiple
            >
              {goalData.measureables && Array.isArray(goalData.measureables) && (
                goalData.measureables.map((measurable, index) => (
                  <option key={index} value={measurable}>
                    {measurable}
                  </option>
                ))
              )}
            </select>

          </label>
          <br></br>
          <label>
            Due Date:
            <div>Making your goals time-bound provides a sense of urgency and a clear deadline, motivating you to take action and track your progress </div>
            <input
              type="date"
              name="completionDate"
              value={format_date(goalData.completionDate)}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit"
          >
            Update Goal
          </button>
        </div>
      </form>)}
    </div>
  )
}

// goalData.defaultProps = {
// 	measureables: [],
// };

export default SingleGoal;