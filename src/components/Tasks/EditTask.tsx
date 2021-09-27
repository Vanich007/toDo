import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/modalReducer";

//форма для коректировки зyarnадачи
export function EditTask(props: any) {
  const dispatch = useDispatch();
  const statuses = ["Backlog", "To Do", "In Progress", "Ready"];
  let [statusState, setStatusState] = useState(props.status);
  let [taskNameState, setTaskNameState] = useState(props.taskName);
  let [deadlineState, setDeadlineState] = useState(props.deadline);

  let [statusIsEditing, setStatusIsEditing] = useState(false);
  let [taskNameIsEditing, setTaskNameIsEditing] = useState(false);

  useEffect(() => {
    if (taskNameIsEditing) {
      // @ts-ignore
      document.getElementById("taskName").focus();
    }
  }, [taskNameIsEditing]);
  useEffect(() => {
    if (statusIsEditing) {
      // @ts-ignore
      document.getElementById("status").focus();
    }
  }, [statusIsEditing]);
  //   useEffect(() => setStatusState(status), [props.status]);
  //   useEffect(() => setTaskNameState(taskName), [taskName]);

  const handleChange = (event: any) => {
    switch (event.target.name) {
      case "status":
        setStatusState(event.target.value);
        break;
      case "taskName":
        setTaskNameState(event.target.value);
        break;
      case "deadline":
        setDeadlineState(event.target.value);
        //console.log(event.target.value);
        break;
    }
  };

  const Blur = (type: string) => {
    //event.preventDefault()
    // console.log(type);
    switch (type) {
      case "status":
        setStatusIsEditing(false);
        break;
      case "taskName":
        setTaskNameIsEditing(false);
        break;
    }
    const date = new Date(deadlineState);
    dispatch(
      actions.setTemporaryTaskData({
        id: props.id,
        status: statusState,
        taskName: taskNameState,
        deadline: date.getTime(),
      })
    );
  };

  const selectStatus = statuses.map((item) => {
    if (item === statusState)
      return (
        <option selected value={item} key={item}>
          {" "}
          {item}
        </option>
      );
    else
      return (
        <option value={item} key={item}>
          {" "}
          {item}
        </option>
      );
  });

  return (
    <div className="form-group form-control-lg">
      {statusIsEditing ? (
        <div>
          <label htmlFor="status" className="col-sm-2 col-form-label">
            Статус
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              id="status"
              name="status"
              //value={statusState}
              onChange={handleChange}
              onBlur={() => Blur("status")}
            >
              {selectStatus}
            </select>
          </div>
        </div>
      ) : (
        <div onClick={() => setStatusIsEditing(true)}>
          <label htmlFor="status" className="col-sm-2 col-form-label">
            Статус
          </label>
          <input
            id="status"
            className="form-control"
            type="text"
            placeholder={statusState}
            //@ts-ignore
            readonly
          />
        </div>
      )}
      {taskNameIsEditing ? (
        <div className="row">
          <label htmlFor="taskName" className="col-sm-2 col-form-label">
            Наименование задачи
          </label>
          <input
            name="taskName"
            id="taskName"
            placeholder="Наименование задачи"
            value={taskNameState}
            onChange={handleChange}
            onBlur={() => Blur("taskName")}
          />
        </div>
      ) : (
        <div onClick={() => setTaskNameIsEditing(true)}>
          <label htmlFor="taskName" className="col-sm-2 col-form-label">
            Наименование задачи
          </label>
          <input
            id="taskName"
            className="form-control"
            type="text"
            placeholder={taskNameState}
            //@ts-ignore
            readonly
          />
        </div>
      )}
      <label htmlFor="deadline" className="col-sm-2 col-form-label">
        Срок исполнения
      </label>
      <DatePicker
        selected={deadlineState}
        onChange={(date) => setDeadlineState(date)}
        onCalendarClose={() => Blur("deadline")}
        name="deadline"
        id="deadline"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}
