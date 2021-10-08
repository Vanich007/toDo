import { FC, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/modalReducer";
import { StatusType } from "../../reducers/tasksReducer";

type EditTaskPropsType = {
  taskName: string;
  status: StatusType;
  deadline: number;
  id: number;
  order: number;
  show: boolean;
  description?: string;
};

export const EditTask: FC<EditTaskPropsType> = (props) => {
  const dispatch = useDispatch();
  const statuses = ["Backlog", "To Do", "In Progress", "Ready"];
  let [statusState, setStatusState] = useState(props.status);
  let [descriptionState, setDescriptionState] = useState(
    props.description ? props.description : ""
  );
  let [taskNameState, setTaskNameState] = useState(props.taskName);
  let [deadlineState, setDeadlineState] = useState<null | Date>(
    new Date(props.deadline)
  );

  let [statusIsEditing, setStatusIsEditing] = useState(false);
  let [taskNameIsEditing, setTaskNameIsEditing] = useState(false);
  let [descriptionIsEditing, setDescriptionIsEditing] = useState(false);

  useEffect(() => {
    if (taskNameIsEditing) {
      (document.getElementById("taskName") as HTMLFormElement).focus();
    }
  }, [taskNameIsEditing]);
  useEffect(() => {
    if (statusIsEditing) {
      (document.getElementById("status") as HTMLFormElement).focus();
    }
  }, [statusIsEditing]);
  useEffect(() => {
    if (descriptionIsEditing) {
      (document.getElementById("description") as HTMLFormElement).focus();
    }
  }, [descriptionIsEditing]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    switch (event.target.name) {
      case "status":
        setStatusState(event.target.value as StatusType);
        break;
      case "taskName":
        setTaskNameState(event.target.value);
        break;
      case "deadline":
        setDeadlineState(new Date(event.target.value));
        break;
      case "description":
        setDescriptionState(event.target.value);
        break;
    }
  };

  const Blur = (type: string) => {
    switch (type) {
      case "status":
        setStatusIsEditing(false);
        break;
      case "taskName":
        setTaskNameIsEditing(false);
        break;
      case "description":
        setDescriptionIsEditing(false);
        break;
    }
    const date = deadlineState ? new Date(deadlineState) : new Date(1);
    dispatch(
      actions.setTemporaryTaskData({
        id: props.id,
        order: props.order,
        status: statusState,
        taskName: taskNameState,
        description: descriptionState,
        deadline: date.getTime(),
      })
    );
  };

  const selectStatus = statuses.map((item) => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });

  return (
    <div className="form-group form-control-lg">
      <div className="input-group mb-3">
        <label htmlFor="status" className="input-group-text">
          Status
        </label>
        <select
          defaultValue={statusState}
          className="form-select"
          id="status"
          name="status"
          onChange={handleChange}
          onBlur={() => Blur("status")}
        >
          {selectStatus}
        </select>
      </div>

      <div className="input-group mb-3">
        <label htmlFor="taskName" className="input-group-text">
          Task name
        </label>
        <input
          className="form-control"
          name="taskName"
          id="taskName"
          placeholder="Task name"
          value={taskNameState}
          onChange={handleChange}
          onBlur={() => Blur("taskName")}
        />
      </div>
      <div className="input-group mb-3">
        <label htmlFor="description" className="input-group-text">
          Description
        </label>
        <input
          className="form-control"
          name="description"
          id="description"
          placeholder="Description"
          value={descriptionState}
          onChange={handleChange}
          onBlur={() => Blur("description")}
        />
      </div>
      <div className="input-group mb-3">
        <label htmlFor="deadline" className="input-group-text">
          Deadline date
        </label>
        {/* <div id="deadlinediv" className="form-control"> */}
        <DatePicker
          className="form-control"
          selected={deadlineState}
          onChange={(date) => setDeadlineState(date as Date)}
          onCalendarClose={() => Blur("deadline")}
          name="deadline"
          id="deadline"
          dateFormat="dd/MM/yyyy"
        />
        {/* </div> */}
      </div>
    </div>
  );
};
