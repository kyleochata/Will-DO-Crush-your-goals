import { useState, useEffect } from 'react';

const CheckboxComponent = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <Checkbox
        label=' Complete'
        value={checked}
        onChange={handleCheckbox}
      />
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input
        type='checkbox'
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default CheckboxComponent;

