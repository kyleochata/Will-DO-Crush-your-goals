import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import GoalsList from '../../components/Goals-Component/Goals';

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
      <main className="all-goals">
        <div>
          <aside><button>+ Add Goal</button></aside>
          <GoalsList
            goals={user.goals}
          />
        </div>
      </main>
    )
}

export default Goals;
