const Checkbox = ({ name, label, value, onChange }) => {
	return (
		<label>
			<input type="checkbox" value={value} checked={value} name={name} onChange={onChange} />
			{label}
		</label>
	);
};

export default Checkbox;