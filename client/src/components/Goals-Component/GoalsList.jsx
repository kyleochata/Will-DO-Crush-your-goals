import { Link } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import { useState, useEffect } from "react";
import CheckboxComponent from "./Checkbox";

// Add task will link to a modal to add a task
const GoalsList = ({ goals = [] }) => {
  if (!goals.length) {
    return <h3 className={style.noTasks}>NO GOALS YET</h3>;
  }

  const [filter, setFilter] = useState("all");

  const format_date = (timestamp) => {
    //month is index 0-11. must add 1 to get correct month
    let timeStamp = new Date(parseInt(timestamp));
    let monthNum = timeStamp.getMonth();
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
    ];
    let currentMonth = months[monthNum];
    let day = timeStamp.getDate();
    let year = timeStamp.getFullYear();

    return `${currentMonth} ${day}, ${year}`;
  };

  const sortedGoals = [...goals].sort((goalA, goalB) => goalA.completionDate - goalB.completionDate);


  return (
		<div className="tasksList">
			<div className="cardFlex">
				{sortedGoals.map((goal) => (
					<div className="cardText" key={goal._id}>
						<Link to={`/goals/${goal._id}`}>
							<div className="liItem">
								<h2 className="taskListTitle">{goal.title}</h2>
								<p className="regularText">{goal.description}</p>
								<p className="regularText">
									{format_date(goal.completionDate)}
								</p>
							</div>
						</Link>
						<CheckboxComponent goal={goal} name={goal._id} />
					</div>
				))}
			</div>
		</div>
	);
};

export default GoalsList;
