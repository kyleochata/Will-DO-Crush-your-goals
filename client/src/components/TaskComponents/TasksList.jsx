import { Link } from 'react-router-dom'
import style from '../../pages/Tasks/Tasks.module.css'
import { useState, useEffect } from 'react'
import CheckboxComponent from './Checkbox'

const TasksList = ({ tasks = [] }) => {
  if (!tasks.length) {
    return <h3 className={style.noTasks}>NO TASKS YET</h3>
  }

  const [filter, setFilter] = useState('all')

  const format_date = (date) => {
    //month is index 0-11. must add 1 to get correct month
    let timeStamp = new Date(date)
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

    const time = format_timeStamp(timeStamp)

    return `${currentMonth} ${day}, ${year} ${time}`
  }

  const format_timeStamp = (date) => {
    let timeStamp = new Date(date)
    let hours = timeStamp.getHours()
    let minutes = timeStamp.getMinutes()
    let amOrPm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    return `${hours}:${minutes} ${amOrPm}`
  }

  // const [isComplete, setIsComplete] = useState(task.isComplete);

  // const toggleComplete = (value) => {
  //   setIsComplete(value);
  // };

  // useEffect(() => {
  // 	// send updated isComplete value to graphQL server when it changes
  // 	// call mutation here to update task's isComplete field
  // 	// Example: useMutation(UPDATE_TASK_COMPLETION ({ variables: { taskId: task.id, isComplete } }));
  // }, [isComplete]);

  return (
    <div className={style.tasksList}>
      <div className="task-filter">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="active">Open</option>
          <option value="completed">Completed</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      {tasks.map((task) => (
        <div className="card-text" key={task._id}>
          <Link to={`/tasks/${task._id}`}>
            <h2 className="liItem">{task.title}</h2>
            <p>{format_date(task.completionDate)}</p>
          </Link>
          {/* <CheckboxComponent isComplete={isComplete} toggleComplete={toggleComplete} /> */}
        </div>
      ))}
    </div>
  )
}

export default TasksList
