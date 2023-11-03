import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// Create

import { QUERY_SINGLE_GOAL } from '../../utils/queries';

const OneGoal = () => {
  const { goalId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_GOAL, {
    variables: { goalId: goalId }
  });
  const goal = data?.goals || [];

  if (loading) {
    return <div>Loading...</div>
  }
}

export default OneGoal;