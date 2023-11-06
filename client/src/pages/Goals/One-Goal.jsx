import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
// Create

import { QUERY_GOAL } from '../../utils/queries'

import SingleGoal from '../../components/Goals-Component/Single-Goal'
import Auth from '../../utils/auth'

const OneGoal = () => {
  const { goalId } = useParams()
  console.log(typeof goalId)
  const test = Auth.getProfile().authenticatedPerson.authID
  console.log(test)
  // const { loading, data } = useQuery(QUERY_GOAL, {
  //   variables: { goalId: goalId },
  // })
  const { data } = useQuery(QUERY_GOAL, {
    variables: { goalId: goalId },
  })
  console.log({ message: data })
  const goal = data?.goals || 'failed to useQuery'
  console.log(goal)

  // if (loading) {
  //   return <div>Loading...</div>
  // }
  return (
    <div className="single-goal">
      <SingleGoal goal={goal} />
    </div>
  )
}

export default OneGoal
