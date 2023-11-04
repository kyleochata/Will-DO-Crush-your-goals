import "./Dashboard.css";
import "../Card/card.css";
import Checkbox from "../TaskComponents/Checkbox";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_TASK, ADD_GOAL } from "../../utils/mutations";
import AddTaskBtn from "../TaskComponents/AddTaskBtn";
import AddGoalBtn from "../Goals-Component/AddGoalBtn";

export default () => {
    const [addTask] = useMutation(ADD_TASK);
    const [addGoal] = useMutation(ADD_GOAL);

    const createGoal = (goalData) => {
        addGoal({ variables: goalData })
            .then((response) => {
                console.log("Goal created:", response.data.addGoal);
            })
            .catch((error) => {
                console.error("Error creating goal:", error);
            });
    };
    const createTask = (taskData) => {
        addTask({ variables: taskData })
            .then((response) => {
                console.log("Task created:", response.data.addTask);
            })
            .catch((error) => {
                console.error("Error creating task:", error);
            });
    };

    return (
        <section class="cards">
            <article className="oneCard">
                <h2 className="cardTitle">TASKS</h2>
                <ul className="cardText">
                    <li className="liItem">
                        The list of Tasks for this user would go here
                    </li>
                </ul>
                <ul className="cardText">
                    <li className="liItem">
                        The list of Tasks for this user would go here
                    </li>
                </ul>
                <ul className="cardText">
                    <li className="liItem">
                        The list of Tasks for this user would go here
                    </li>
                </ul>
                <ul className="cardText">
                    <li className="liItem">
                        The list of Tasks for this user would go here
                    </li>
                </ul>
                <ul className="cardText">
                    <li className="liItem">
                        The list of Tasks for this user would go here
                    </li>
                </ul>
                <ul className="cardText">
                    <li className="liItem">
                        The list of Tasks for this user would go here
                    </li>
                </ul>
                <div className="dashButtonContainer">
                    <Link to="/tasks">
                        <button className="dashButton">View All</button>
                    </Link>
                    <AddTaskBtn createTask={createTask} />
                </div>
            </article>
            <article className="oneCard">
                <h2 className="cardTitle">GOALS</h2>
                <ul className="cardText">
                    <li className="liItem">
                        The list of Goals for this user would go here
                    </li>
                    <li className="liItem">
                        The list of Goals for this user would go here
                    </li>
                </ul>
                <div className="dashButtonContainer">
                    <Link to="/goals">
                        <button className="dashButton">View All</button>
                    </Link>
                    <AddGoalBtn createGoal={createGoal} />
                </div>
            </article>
        </section>
    );
};
