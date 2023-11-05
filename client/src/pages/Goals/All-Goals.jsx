import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import GoalsList from '../../components/Goals-Component/Goals';
import AddGoalBtn from '../../components/Goals-Component/AddGoalBtn';
import { ADD_GOAL } from "../../utils/mutations";

console.log("before createGoal func")
function Goals() {
  const [addGoal] = useMutation(ADD_GOAL);
  
  const createGoal = (goalData) => {
    addGoal({ variables: goalData })
      .then((response) => {
        console.log("Goal created:", response.data.addGoal);
      })
      .catch((error) => {
        console.error("Error creating goal:", error);
      });
  };
  console.log("after createGoal func")
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId }
  });
  const user = data?.user || [];
  console.log(user);
  console.log(data);
  if (loading) {
    return <div>Loading...</div>
  }
  console.log("before return jsx")
  return (
    <div className="Goals">
      <AddGoalBtn createGoal={createGoal} />
      <GoalsList
        goals={user.goals}

      />
    </div>
  )
}
console.log("after return jsx")
export default Goals