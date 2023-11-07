import { Link } from "react-router-dom";
import "../../components/Dashboard/Dashboard.css";
import { useState, useEffect } from "react";
import CheckboxComponent from "./Checkbox";

const GoalsList = ({ goals = [] }) => {
  if (!goals.length) {
    return <h3 className="noTasks">NO GOALS YET</h3>;
  }

  const format_date = (timestamp) => {
    //month is index 0-11. must add 1 to get correct month
    const date = new Date(parseInt(timestamp));
  
    // Adjust for the timezone offset to get the correct GMT date
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    let monthNum = utcDate.getMonth()
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',
    ]
    let currentMonth = months[monthNum]
    let day = utcDate.getDate()
    let year = utcDate.getFullYear()

    return `${currentMonth} ${day}, ${year}`
  }

  const [filter, setFilter] = useState('active')


  const [sortedGoals, setSortedGoals] = useState([...goals].sort((goalA, goalB) => goalA.completionDate - goalB.completionDate))

  useEffect(() => {
    if (filter === "all") {
      setSortedGoals([...goals].sort((goalA, goalB) => goalA.completionDate - goalB.completionDate))
    } else if (filter === "active") {
      const temp = [...goals].sort((goalA, goalB) => goalA.completionDate - goalB.completionDate)
      const filteredActive = temp.filter((goal) => !goal.completed)
      setSortedGoals(filteredActive)
    } else {
      const temp1 = [...goals].sort((goalA, goalB) => goalA.completionDate - goalB.completionDate)
      const filteredComplete = temp1.filter((goal) => goal.completed)
      setSortedGoals(filteredComplete)
    }
    console.log(filter)
    console.log(sortedGoals)
  }, [filter])

  return (
    <div className="tasksList">
      <div className="task-filter">
        <div className="filterContainer">
          <p className="filterText">Status:</p>
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="active">Open</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="cardFlex">
        {
          sortedGoals.length > 0
            ?
            sortedGoals.map((goal) => (
              <div className="cardText" key={goal._id}>
                <Link to={`/goals/${goal._id}`}>
                  <div className="liItem">
                    <h2 className="taskListTitle">{goal.title}</h2>
                    <p className="regularText">{goal.description}</p>
                    <p className="regularText">{format_date(goal.completionDate)}</p>
                  </div>
                </Link>
                <CheckboxComponent
                  goal={goal}
                  name={goal._id}
                  
                  />
              </div>
            ))
            : <div className="noTasks">No Goals to Display</div>
        }
      </div>
    </div>
  );
};

export default GoalsList;
