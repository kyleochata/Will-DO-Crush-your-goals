import { useState, useEffect } from "react";
import Checkbox from "./ReUsableCheckbox";
import { useMutation } from "@apollo/client";
import { EDIT_TASK } from "../../utils/mutations";

const CheckboxComponent = ({ task }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const [updateTaskCompletion] = useMutation(EDIT_TASK);

  useEffect(() => {
    if (checked === true) {
      updateTaskCompletion({
        variables: { taskId: task._id, completed: true },
      })
    } else {
      updateTaskCompletion({
        variables: { taskId: task._id, completed: false },
      })
    }
  }, [checked]);

  return (
    <div>
      <Checkbox label="Complete" value={checked} onChange={handleCheckbox} />
    </div>
  );
};

export default CheckboxComponent;
