import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TaskItem } from "./TaskItem";
import style from "./Tasks.module.css";
import { AppStateType } from "../../reduxStore";

const Tasks = (props) => {
  let tasks = [];
  //if (!projectsIsFetching)

  const backlogTasks = props.tasks
    .filter((item) => item.status === "Backlog")
    .map((item) => {
      return (
        <div key={item._id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const todoTasks = props.tasks
    .filter((item) => item.status === "To Do")
    .map((item) => {
      return (
        <div key={item._id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const inProgressTasks = props.tasks
    .filter((item) => item.status === "In Progress")
    .map((item) => {
      return (
        <div key={item._id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const readyTasks = props.tasks
    .filter((item) => item.status === "Ready")
    .map((item) => {
      return (
        <div key={item._id}>
          <TaskItem task={item} />
        </div>
      );
    });

  return (
    <div className={style.container}>
      <div className={`${style.backlogTasks} ${style.group}`}>
        {backlogTasks}
      </div>
      <div className={`${style.todoTasks} ${style.group}`}>{todoTasks}</div>
      <div className={`${style.inProgressTasks} ${style.group}`}>
        {inProgressTasks}
      </div>
      <div className={`${style.readyTasks} ${style.group}`}>{readyTasks}</div>
    </div>
  );
};

const mapStateToProps = (state:AppStateType) => {
  return {
    tasks: state.tasksPage.tasks
  };
};

const TasksContainer = connect(mapStateToProps, {})(Tasks);

export default TasksContainer;
