import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import GoalsList from '../../components/Goals-Component/Goals';
import AddGoalBtn from '../../components/Goals-Component/AddGoalBtn';

const Goals = () => {
  const { userId } = useParams()
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId }
  });
  const user = data?.user || [];
  
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="Goals">
      <AddGoalBtn />
      <GoalsList
        goals={user.goals}
        // title={user.goals.title}
      />
    </div>
  )
}

export default Goals;