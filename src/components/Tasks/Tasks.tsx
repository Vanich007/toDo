import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskItem } from "./TaskItem";
import "./Tasks.scss";
import { getTasksFetch } from "../../reducers/tasksReducer";
import {
  getModalIsActive,
  getTasks,
  getTasksMaxId,
} from "../../selectors/taskSelectors";
import { ShowTaskInModal } from "../Modal/Modal";
import { actions } from "../../reducers/modalReducer";
import { useHistory } from "react-router-dom";

export const Tasks: React.FC = (props) => {
  const tasks = useSelector(getTasks);
  const modalIsActive = useSelector(getModalIsActive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksFetch());
  }, []);

  //let tasks = [];
  //if (!projectsIsFetching)

  const backlogTasks = tasks
    .filter((item) => item.status === "Backlog")
    .map((item) => {
      return (
        <div className="group-wrapper" key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const todoTasks = tasks
    .filter((item) => item.status === "To Do")
    .map((item) => {
      return (
        <div className="group-wrapper" key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const inProgressTasks = tasks
    .filter((item) => item.status === "In Progress")
    .map((item) => {
      return (
        <div className="group-wrapper" key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const readyTasks = tasks
    .filter((item) => item.status === "Ready")
    .map((item) => {
      return (
        <div className="group-wrapper" key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  let id = useSelector(getTasksMaxId) as number;
  id++;
  const newTask = () => {
    const deadline = Date.now();
    dispatch(
      actions.setModalTask({
        id,
        status: "To Do",
        taskName: "New Task",
        deadline,
      })
    );
  };
  return (
    <>
      <div className="container">
        <div className="double-row">
          <div className="backlogTasks group">{backlogTasks}</div>
          <div className="todoTasks group">{todoTasks}</div>
        </div>
        <div className="double-row">
          <div className="inProgressTasks group">{inProgressTasks}</div>
          <div className="readyTasks group">{readyTasks}</div>
        </div>
        {modalIsActive ? <ShowTaskInModal show={modalIsActive} /> : null}
        <button
          title="Add task"
          className="add_task_button"
          onClick={newTask}
        ></button>
      </div>
    </>
  );
};
