import { Link } from 'react-router-dom'
import '../Dashboard/Dashboard.css'
import { useState } from 'react'
import CheckboxComponent from './Checkbox'

const TasksList = ({ tasks = [] }) => {
  if (!tasks.length) {
    return <h3 className="noTasks">NO TASKS YET</h3>
  }

  const [filter, setFilter] = useState('active')
  const [priority, setPriority] = useState('all')

  const format_date = (timestamp) => {
    //month is index 0-11. must add 1 to get correct month
    let timeStamp = new Date(parseInt(timestamp))
    let monthNum = timeStamp.getMonth()
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    let currentMonth = months[monthNum]
    let day = timeStamp.getDate()
    let year = timeStamp.getFullYear()

    return `${currentMonth} ${day}, ${year}`
  }

  const [sortedTasks, setSortedTasks] = useState([...tasks].sort((taskA, taskB) => taskA.completionDate - taskB.completionDate))


  useEffect(() => {
    // Filter by status (e.g., active, completed, or all)
    let filteredTasksByStatus = [];
    if (filter === 'all') {
      filteredTasksByStatus = [...tasks];

    } else if (filter === 'active') {
      filteredTasksByStatus = tasks.filter((task) => !task.completed);
    } else {
      filteredTasksByStatus = tasks.filter((task) => task.completed);
    }
  
    let filteredTasksByPriority = [];
    if (priority === 'all') {
      filteredTasksByPriority = [...filteredTasksByStatus];
    } else {
      filteredTasksByPriority = filteredTasksByStatus.filter((task) => task.priority === priority);
    }
    console.log(priority)
    // Update the sortedTasks state with the final filtered results
    setSortedTasks([...filteredTasksByPriority].sort((taskA, taskB) => taskA.completionDate - taskB.completionDate));
    console.log(filteredTasksByStatus);
    console.log(filteredTasksByPriority)
  }, [filter, priority]);
  

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
        <div className="filterContainer">
        <p className="filterText">Priority:</p>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
        <option value="all">All</option>
          <option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
        </select>
        </div>
			</div>
			<div className="cardFlex">
        {
          sortedTasks.length > 0
          ?
				sortedTasks.map((task) => (
					<div className="cardText" key={task._id}>
						<Link to={`/tasks/${task._id}`}>
							<div className="liItem">
								<h2 className="taskListTitle">{task.title}</h2>
								<pre className="regularText">{task.description}</pre>
								<p className="regularText">
									{format_date(task.completionDate)}
								</p>
							</div>
						</Link>
						<CheckboxComponent task={task} name={task._id} />
					</div>
				))
      : <div className="noTasks">No Tasks to Display</div>
      }
			</div>
		</div>
	);
}

export default TasksList
