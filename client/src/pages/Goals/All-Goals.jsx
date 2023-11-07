import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_USER } from '../../utils/queries'
import GoalsList from '../../components/Goals-Component/GoalsList'
import AddGoalBtn from '../../components/Goals-Component/AddGoalBtn'
import { ADD_GOAL } from '../../utils/mutations'
import Auth from '../../utils/auth'
import "../../components/Dashboard/Dashboard.css"

function Goals() {
    const [addGoal] = useMutation(ADD_GOAL)

    const createGoal = (goalData) => {
        addGoal({ variables: goalData })
            .then((response) => {
                console.log('Goal created:', response.data.addGoal)
            })
            .catch((error) => {
                console.error('Error creating goal:', error)
            })
    }
    const auth_ID = Auth.getProfile().authenticatedPerson.authID
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { authID: auth_ID },
    })

  const user = data?.user || {}
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="mainTask">
      <section className="cards">
        <article className="oneCard">
          <h2 className="cardTitle">ALL GOALS</h2>
          <div className="dashButtonContainer">
            <AddGoalBtn createGoal={createGoal} />
          </div>
          <div className="goalDashSpacing"></div>
          <GoalsList goals={user.goals} />
        </article>
      </section>
    </div>
  )
}
export default Goals
