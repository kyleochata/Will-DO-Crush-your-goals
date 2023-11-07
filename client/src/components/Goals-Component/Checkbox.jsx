import { useState, useEffect } from "react";
import Checkbox from "../../components/TaskComponents/ReUsableCheckbox";
import { useMutation } from "@apollo/client";
import { EDIT_GOAL} from "../../utils/mutations";

const CheckboxComponent = ({ goal }) => {
	const [checked, setChecked] = useState(goal.completed);

	const handleCheckbox = () => {
		setChecked(!checked);
	};

	const [updateTaskCompletion] = useMutation(EDIT_GOAL);

	useEffect(() => {
		if (checked === true) {
			updateTaskCompletion({
				variables: { goalId: goal._id, completed: true },
			});
		} else {
			updateTaskCompletion({
				variables: { goalId: goal._id, completed: false },
			});
		}
	}, [checked]);

	return (
		<div>
			<Checkbox
				label="Complete"
				value={goal.completed}
				onChange={handleCheckbox}
			/>
		</div>
	);
};

export default CheckboxComponent;
