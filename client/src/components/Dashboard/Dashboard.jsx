import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TASK, ADD_GOAL } from "../../utils/mutations";
import AddTaskBtn from "../TaskComponents/AddTaskBtn";
import AddGoalBtn from "../Goals-Component/AddGoalBtn";
import Auth from '../../utils/auth'
import TasksListDash from '../../components/TaskComponents/TaskListDash.jsx'
import GoalListDash from '../../components/Goals-Component/GoalListDash.jsx'
import { QUERY_USER } from '../../utils/queries'

export default () => {

    const auth_ID = Auth.getProfile().authenticatedPerson.authID
    const { data } = useQuery(QUERY_USER, {
      variables: { authID: auth_ID },
    })
    const user = data?.user || {}


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
        <section className="cards">
            <article className="oneCard">
                <h2 className="cardTitle">TASKS</h2>
                <p className="dashText">Your next 5 Tasks<br></br>In order<br></br>By most recent target dates</p>
                <div className="dashButtonContainer">
                    <Link to="/tasks">
                        <button className="dashButton">View All</button>
                    </Link>
                    <AddTaskBtn
                    createTask={createTask}
					goals={user.goals}
            />
                </div>
                <div className="goalDashSpacing"></div>
                <TasksListDash tasks={user.tasks} />
                
            </article>
            <article className="oneCard">
                <h2 className="cardTitle">GOALS</h2>
                <p className="dashText">Your next 5 Goals<br></br>In order<br></br>By most recent target dates</p>
                <div className="dashButtonContainer">
                    <Link to="/goals">
                        <button className="dashButton">View All</button>
                    </Link>
                    <AddGoalBtn createGoal={createGoal} />
                </div> 
                <div className="goalDashSpacing"></div>
                <GoalListDash goals={user.goals} />
                
            </article>
        </section>
    );
};
