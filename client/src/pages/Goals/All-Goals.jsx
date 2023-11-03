import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import GoalsList from '../../components/Goals-Component/Goals';

const Goals = () => {
    const { userId } = useParams()
    const { loading, data } = useQuery(QUERY_USER, {
      variables: { userId: userId }
    });
    const goals = data?.goals || [];
    const length = goals.tasks.length;

    if (loading) {
      return <div>Loading...</div>
    }
    return (
      <main>
        <div className="Goals">
          <h1>All Goals</h1>
          <aside><button>+ Add Goal</button></aside>
          <GoalsList
            goals={goals}
            title={goals.title}
            numberOfOpenTasks={length}
          />
        </div>
      </main>
    )
}

export default Goals;
