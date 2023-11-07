import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_TASK } from "../../utils/mutations";

const CheckboxComponent = ({ task }) => {
  const [checked, setChecked] = useState(task.completed);
  const [buttonText, setButtonText] = useState(task.completed ? "ReOpen" : "Complete");

  const toggleCompletion = () => {
    setChecked(!checked);
    setButtonText(checked ? "Complete" : "ReOpen");
  };

  const [updateTaskCompletion] = useMutation(EDIT_TASK);

  useEffect(() => {
    if (checked !== task.completed) {
      updateTaskCompletion({
        variables: { taskId: task._id, completed: checked },
      });
    }
  }, [checked, task.completed, task._id, updateTaskCompletion]);

  return (
    <div>
      <button onClick={toggleCompletion} className="dashButton">{buttonText}</button>
    </div>
  );
};

export default CheckboxComponent;
