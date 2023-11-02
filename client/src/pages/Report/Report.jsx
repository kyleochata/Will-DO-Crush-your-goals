import DataTree from '../../components/DataTree/DataTree'
import style from './Report.module.css'
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
  return (
    <div className={style.reportMain}>
      <h1>Reports</h1>
      <DataTree data={data} style={style} />
    </div>
  )
}
export default Report
