import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import GoalsList from '../../components/Goals-Component/Goals';
import AddGoalBtn from '../../components/Goals-Component/AddGoalBtn';
import { ADD_GOAL } from "../../utils/mutations";
import style from '../Tasks/Tasks.module.css';

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
        <div className={style.mainTask}>
            <section className="cards">
                <article className="oneCard">
                    <h2 className="cardTitle">ALL GOALS</h2>
                    <ul className="cardText">
                        <li className="liItem">
                            The list of Goals for this user would go here ;hds af;h ds;fhdsa;jfhsda ;jfhdskajh fgkjdsahfj;d hs fsdafs dafg dsgafdsf
                        </li>
                    </ul>
                    <ul className="cardText">
                        <li className="liItem">
                            The list of Goals for this user would go hereds afdsagfdagfadgfdagfadf dsfdsagd
                        </li>
                    </ul>
                    <ul className="cardText">
                        <li className="liItem">
                            The list of Goals for this user would go hereag fdagadsffda sfgdsafdsf
                        </li>
                    </ul>
                    <ul className="cardText">
                        <li className="liItem">
                            The list of Goals for this user would go here asdfdasfdsa fds
                        </li>
                    </ul>
                    <ul className="cardText">
                        <li className="liItem">
                            The list of Goals for this user would go here
                        </li>
                    </ul>
                    <ul className="cardText">
                        <li className="liItem">
                            The list of Goals for this user would go here
                        </li>
                    </ul>
                    {/* goal list card */}
                    <GoalsList
                        goals={user.goals}
                    />
                    <div className="dashButtonContainer">
                        <AddGoalBtn createGoal={createGoal} />
                    </div>

                </article>
            </section>
        </div>
    )
}
console.log("after return jsx")
export default Goals