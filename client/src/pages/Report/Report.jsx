import DataTree from '../../components/DataTree/DataTree'
import style from './Report.module.css'
import useResizeObserver from '../../utils/useResize'
import { useRef, useEffect } from 'react'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
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
  // const wrapperRef = useRef()
  // const dimensions = useResizeObserver(wrapperRef)
  // useEffect(() => {
  //   console.log(dimensions)
  // }, [dimensions])
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
