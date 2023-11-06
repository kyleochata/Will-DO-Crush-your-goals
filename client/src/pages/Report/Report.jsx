import DataTree from '../../components/DataTree/DataTree'
import style from './Report.module.css'
import useResizeObserver from '../../utils/useResize'
import { useRef, useEffect, useState } from 'react'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { useMutation } from '@apollo/client'
import { QUERY_ALL_GOALS } from '../../utils/queries'
import { useParams } from 'react-router-dom'
const data = {
  name: 'Lose weight', //Goal
  children: [
    {
      name: 'Eat 2 Healthy meals/day', //Measurable
      children: [
        { name: 'Grocery shopping 1/week' }, //Tasks to achieve measurable
        { name: 'Meal prep for 5+ days of lunches' },
        { name: 'Try a new recipe 2/week' },
      ],
    },
    {
      name: 'Exercise 3x/week', //Measurable
      children: [
        { name: 'Get a gym membership' },
        { name: 'Set a workout plan for the week' }, //tasks
        { name: 'Laundry 1/week' },
      ],
    },
    {
      name: 'Sleep 8 hours/night', //measurable
      children: [
        { name: 'Set a bedtime alarm' }, //tasks
        { name: 'No screens 1 hour before bed' },
        { name: 'Hot shower no less than 2hrs before bed' },
      ],
    },
  ],
}

const Report = () => {
  const [userGoal, setUserGoal] = useState('') //keep track of all goals
  const [treeData, setTreeData] = useState({}) //data to sent to tree
  const [overallPercent, setOverallPercent] = useState(0) //overall percent
  const [goalPercent, setGoalPercent] = useState(0) //goal percent
  const [taskPercent, setTaskPercent] = useState(0) //task percent
  const [wildCardPercent, setWildCardPercent] = useState(0) //wildcard percent

  // useEffect(() => {
  //   const getGoals = async () => {
  //     try {
  //       const { data } = await getGoal()
  //       console.log(data)
  //     } catch (err) {
  //       console.log('no goals found', err)
  //     }
  //   }
  //   getGoals()
  // }, [])

  return (
    <div className={style.reportMain}>
      <div className={style.reportProgressContainer}>
        <div className={style.reportProgress}>
          <h3>Overall %</h3>
          <div className={style.circleContainer}>
            <ProgressBar />
          </div>
        </div>
        <div className={style.reportProgress}>
          <h3>goal %</h3>
          <div className={style.circleContainer}>
            <ProgressBar />
          </div>
        </div>
        <div className={style.reportProgress}>
          <h3>Task %</h3>
          <div className={style.circleContainer}>
            <ProgressBar />
          </div>
        </div>
        <div className={style.reportProgress}>
          <h3>WildCard</h3>
          <div className={style.circleContainer}>
            <ProgressBar />
          </div>
        </div>
      </div>

      <DataTree data={data} style={style} />
    </div>
  )
}
export default Report
