import DataTree from '../../components/DataTree/DataTree'
import style from './Report.module.css'
import useResizeObserver from '../../utils/useResize'
import { useRef, useEffect } from 'react'
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
      <h1>Reports</h1>
      <div className={style.reportProgressContainer}>
        <div className={style.reportProgress}>overall %</div>
        <div className={style.reportProgress}>goal %</div>
        <div className={style.reportProgress}>task %</div>
        <div className={style.reportProgress}>Wild Card</div>
      </div>

      <DataTree data={data} style={style} />
    </div>
  )
}
export default Report
