import { Link } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import { useState } from "react";
import CheckboxComponent from "./Checkbox";

const TasksList = ({ tasks = [] }) => {
	if (!tasks.length) {
		return <h3 className="noTasks">NO TASKS YET</h3>;
	}

	const [filter, setFilter] = useState("all");

	const format_date = (timestamp) => {
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

	return (
		<div className="tasksList">
			<div className="task-filter">
				<p className="filterText">Filter:</p>
				<select onChange={(e) => setFilter(e.target.value)} value={filter}>
					<option value="all">All</option>
					<option value="active">Open</option>
					<option value="completed">Completed</option>
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
				</select>
			</div>
			<div className="cardFlex">
				{tasks.map((task) => (
					<div className="cardText" key={task._id}>
						<Link to={`/tasks/${task._id}`}>
							<div className="liItem">
								<h2 className="taskListTitle">{task.title}</h2>
								<pre>
									<p className="regularText">{task.description}</p>
								</pre>
								<p className="regularText">
									{format_date(task.completionDate)}
								</p>
							</div>
            </Link>
            <CheckboxComponent
                task={task}
                name={task._id}
              />
					</div>
				))}
			</div>
		</div>
	);
};

export default TasksList;
