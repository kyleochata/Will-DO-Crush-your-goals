import React from "react";

const CheckboxComponent = ({ isComplete, toggleComplete }) => {
	const handleCheckbox = () => {
		// Toggle the isComplete value and pass it to the callback function
		toggleComplete(!isComplete);
	};

	return (
		<div>
			<Checkbox label="Complete" value={isComplete} onChange={handleCheckbox} />
		</div>
	);
};

const Checkbox = ({ label, value, onChange }) => {
	return (
		<label>
			<input type="checkbox" checked={value} onChange={onChange} />
			{label}
		</label>
	);
};

export default CheckboxComponent;
