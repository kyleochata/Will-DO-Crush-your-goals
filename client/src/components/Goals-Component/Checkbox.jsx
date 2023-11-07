import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_GOAL} from "../../utils/mutations";

const CheckboxComponent = ({ goal }) => {

	const [checked, setChecked] = useState(goal.completed);
  const [buttonText, setButtonText] = useState(
    goal.completed ? "ReOpen" : "Complete"
  );

  const toggleCompletion = () => {
    setChecked(!checked);
    setButtonText(checked ? "Complete" : "ReOpen");
  };

  const [updateGoalCompletion] = useMutation(EDIT_GOAL);

  useEffect(() => {
    if (checked !== goal.completed) {
      updateGoalCompletion({
        variables: { goalId: goal._id, completed: checked },
      });
    }
  }, [checked, goal.completed, goal._id, updateGoalCompletion]);

	return (
		<div>
			<button onClick={toggleCompletion} className="dashButton">{buttonText}</button>
		</div>
	);
};

export default CheckboxComponent;
