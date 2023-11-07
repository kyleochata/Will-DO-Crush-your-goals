// import DataTree from '../../components/DataTree/DataTree'
// import style from './Report.module.css'
// import useResizeObserver from '../../utils/useResize'
// import { useRef, useEffect, useState } from 'react'
// import ProgressBar from '../../components/ProgressBar/ProgressBar'
// import { useMutation } from '@apollo/client'
// import { QUERY_ALL_GOALS } from '../../utils/queries'
// import { useParams } from 'react-router-dom'
// const data = {
//   name: 'Lose weight', //Goal
//   children: [
//     {
//       name: 'Eat 2 Healthy meals/day', //Measurable
//       children: [
//         { name: 'Grocery shopping 1/week' }, //Tasks to achieve measurable
//         { name: 'Meal prep for 5+ days of lunches' },
//         { name: 'Try a new recipe 2/week' },
//       ],
//     },
//     {
//       name: 'Exercise 3x/week', //Measurable
//       children: [
//         { name: 'Get a gym membership' },
//         { name: 'Set a workout plan for the week' }, //tasks
//         { name: 'Laundry 1/week' },
//       ],
//     },
//     {
//       name: 'Sleep 8 hours/night', //measurable
//       children: [
//         { name: 'Set a bedtime alarm' }, //tasks
//         { name: 'No screens 1 hour before bed' },
//         { name: 'Hot shower no less than 2hrs before bed' },
//       ],
//     },
//   ],
// }

// const Report = () => {

//   return (
//     <div className={style.reportMain}>
//       <div className={style.reportProgressContainer}>
//         <div className={style.reportProgress}>
//           <h3>Overall %</h3>
//           <div className={style.circleContainer}>
//             <ProgressBar />
//           </div>
//         </div>
//         <div className={style.reportProgress}>
//           <h3>goal %</h3>
//           <div className={style.circleContainer}>
//             <ProgressBar />
//           </div>
//         </div>
//         <div className={style.reportProgress}>
//           <h3>Task %</h3>
//           <div className={style.circleContainer}>
//             <ProgressBar />
//           </div>
//         </div>
//         <div className={style.reportProgress}>
//           <h3>WildCard</h3>
//           <div className={style.circleContainer}>
//             <ProgressBar />
//           </div>
//         </div>
//       </div>

//       <DataTree data={data} style={style} />
//     </div>
//   )
// }
// export default Report
import DataTree from '../../components/DataTree/DataTree'
import style from './Report.module.css'
import { useState } from 'react'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { useQuery } from '@apollo/client'
import { QUERY_USER } from '../../utils/queries'

import Auth from '../../utils/auth'

const smartData = {
  name: 'S: Specific',
  children: [
    { name: 'Objective is clearly stated so anyone can understand' },
    {
      name: 'M: Measurable',
      children: [
        { name: 'Actions to be measured' },
        {
          name: 'A: Achievable',
          children: [
            { name: 'Actions to be taken to achieve goal' },
            {
              name: 'R: Relevant',
              children: [
                { name: 'Explains WHY this is a goal' },
                {
                  name: 'T: Time-bound',
                  children: [{ name: 'Time to complete' }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const testData = {
  name: 'S: Lose weight',
  children: [
    {
      name: 'M: Eat 2 Healthy meals/day',
      children: [
        { name: 'A: Grocery shopping 1/week' },
        { name: 'A: Meal prep for 5 meals' },
        { name: 'A: Try a new recipe 2/week' },
      ],
    },
    {
      name: 'M: Exercise 3x/week',
      children: [
        { name: 'A: Get a gym membership' },
        { name: 'A: Play pickleball 1/week' },
        { name: 'A: Laundry 1/week' },
      ],
    },
    {
      name: 'M: Sleep 8 hours/night',
      children: [
        { name: 'A: Set a bedtime alarm' },
        { name: 'A: No screens 1 hour before bed' },
        { name: 'A: Hot shower before bed' },
      ],
    },
    {
      name: 'T: 6 months',
    },
  ],
}

const Report = () => {
  const auth_ID = Auth.getProfile().authenticatedPerson.authID
  console.log(auth_ID)
  const secondData = useQuery(QUERY_USER, {
    variables: { authID: auth_ID },
  })
  const [treeData, setTreeData] = useState(smartData)

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value
    if (selectedValue === 'smartData') {
      setTreeData(smartData)
      console.log({ smartData: treeData })
    } else if (selectedValue === 'testData') {
      setTreeData(testData)
      console.log({ testData: treeData })
    }
  }

  console.log(secondData)
  const userData = secondData?.data?.user || {}
  console.log(userData)
  const totalTask = userData.tasks
  const totalTaskNum = totalTask.length
  console.log({ totalTask: totalTask })
  console.log(totalTaskNum)

  const completedTask = totalTask.filter((task) => task.completed === true)
  console.log(completedTask)
  let completedNumTask = 0
  completedTask.length !== 0
    ? (completedNumTask = completedTask.length)
    : (completedNumTask = 0)
  console.log({ completedNumTask: completedNumTask })
  const taskPercentCalc = (completedNumTask / totalTaskNum) * 100
  const taskPercent = Math.round(taskPercentCalc)

  const totalGoal = userData.goals

  console.log({ totalGoal: totalGoal })
  const totalGoalNum = totalGoal.length
  console.log({ totalGoalNum: totalGoalNum })
  const completedGoal =
    totalGoal.filter((goal) => goal.completed === true) || []
  let completedGoalNum = 0
  completedGoal.length !== 0
    ? (completedGoalNum = completedGoal.length)
    : (completedGoalNum = 0)
  console.log({ completedGNum: completedGoalNum })
  const goalPercentCalc = (completedGoalNum / totalGoalNum) * 100
  const goalPercent = Math.round(goalPercentCalc)

  const overallTotal = totalGoalNum + totalTaskNum
  const overallCompleted = completedGoalNum + completedNumTask
  const overallPercentCalc = (overallCompleted / overallTotal) * 100
  const overallPercent = Math.round(overallPercentCalc)

  return (
    <div className={style.reportMain}>
      <div className={style.reportProgressContainer}>
        <div className={style.reportProgress}>
          <h3>Overall</h3>
          <div className={style.circleContainer}>
            <ProgressBar percent={overallPercent} />
          </div>
        </div>
        <div className={style.reportProgress}>
          <h3>Goals Completed</h3>
          <div className={style.circleContainer}>
            <ProgressBar percent={goalPercent} />
          </div>
        </div>
        <div className={style.reportProgress}>
          <h3>Tasks Completed</h3>
          <div className={style.circleContainer}>
            <ProgressBar percent={taskPercent} />
          </div>
        </div>
      </div>
      <div className={style.TreeContainer}>
        <h2>SMART GOAL TREE</h2>
        <div className={style.SmartDiv}>Learn more about SMART Goals</div>
        <select onChange={handleSelectChange}>
          <option value="smartData">Definition</option>
          <option value="testData">Goal Example</option>
        </select>
      </div>
      <DataTree treeData={treeData} style={style} />
    </div>
  )
}

export default Report

// to work on after MVP
// const findTreeData = async (goalID) => {
//   const goalData = await useQuery(QUERY_GOAL, { variables: { goalID } })
//   console.log(goalData)
// }
// const handleSelectChange = ({ target }) => {
//   console.log(target.value)
//   setTreeData(target.value)
// }
