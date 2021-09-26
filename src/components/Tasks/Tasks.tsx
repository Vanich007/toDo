import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { TaskItem } from "./TaskItem";
import "./Tasks.scss";
import { AppStateType } from "../../reduxStore";
import { TaskType, getTasksFetch } from "../../reducers/tasksReducer";
import {
  getActiveTask,
  getModalIsActive,
  getTasks,
} from "../../selectors/taskSelectors";
import { ShowTaskInModal } from "../Modal/Modal";
//import { actions} from "../../reducers/modalReducer";

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
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const todoTasks = tasks
    .filter((item) => item.status === "To Do")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const inProgressTasks = tasks
    .filter((item) => item.status === "In Progress")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const readyTasks = tasks
    .filter((item) => item.status === "Ready")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });

  return (
    <>
      {" "}
      <div className="container">
        <div className="backlogTasks group">{backlogTasks}</div>
        <div className={`todoTasks group`}>{todoTasks}</div>
        <div className={`inProgressTasks group`}>{inProgressTasks}</div>
        <div className={`readyTasks group`}>{readyTasks}</div>
        {modalIsActive ? <ShowTaskInModal /> : null}
      </div>
    </>
  );
};

// const mapStateToProps = (state: AppStateType) => {
//   return {};
// };

// const TasksContainer = connect(mapStateToProps, { getTasksFetch })(Tasks);

// export default TasksContainer;
