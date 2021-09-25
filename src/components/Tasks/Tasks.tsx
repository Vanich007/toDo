import React, { useEffect } from "react";
import { connect } from "react-redux";
import { TaskItem } from "./TaskItem";
import "./Tasks.scss";
import { AppStateType } from "../../reduxStore";
import { TaskType, getTasksFetch } from "../../reducers/tasksReducer";
import { ShowTaskInModal } from "../Modal/Modal";
//import { actions} from "../../reducers/modalReducer";
type TasksPropsType = {
  tasks: Array<TaskType>;
  modalIsActive: boolean;
  getTasksFetch: any;
  activeTask: TaskType;
};

const Tasks: React.FC<TasksPropsType> = (props) => {
  useEffect(() => {
    props.getTasksFetch();
  }, []);

  //let tasks = [];
  //if (!projectsIsFetching)

  const backlogTasks = props.tasks
    .filter((item) => item.status === "Backlog")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const todoTasks = props.tasks
    .filter((item) => item.status === "To Do")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const inProgressTasks = props.tasks
    .filter((item) => item.status === "In Progress")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const readyTasks = props.tasks
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
        props.modalIsActive?
        <ShowTaskInModal activeTask={props.activeTask} />
        :null
      </div>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    tasks: state.tasksPage.tasks,
    modalIsActive: state.modalPage.modalIsActive,
    activeTask: state.modalPage.activeTask,
  };
};

const TasksContainer = connect(mapStateToProps, { getTasksFetch })(Tasks);

export default TasksContainer;
