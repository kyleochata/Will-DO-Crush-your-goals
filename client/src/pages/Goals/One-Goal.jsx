import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Create

import { QUERY_GOAL } from '../../utils/queries';

import SingleGoal from '../../components/Goals-Component/Single-Goal';

const OneGoal = () => {
  const { goalId } = useParams();

  const { loading, data } = useQuery(QUERY_GOAL, {
    variables: { goalId: goalId }
  });
  const goal = data?.goals || [];

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <main className="single-goal-main">
      <div>
        <SingleGoal
        goal={goal}
        />
      </div>
    </main>
  )
}

export default OneGoal;