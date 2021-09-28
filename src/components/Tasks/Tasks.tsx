import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskItem } from "./TaskItem";
import "./Tasks.scss";
import { getTasksFetch, StatusType } from "../../reducers/tasksReducer";
import {
  getModalIsActive,
  getTasks,
  getTasksMaxId,
} from "../../selectors/taskSelectors";
import { ShowTaskInModal } from "../Modal/Modal";
import { actions } from "../../reducers/modalReducer";

const Backlog = "Backlog";
const ToDo = "To Do";
const InProgress = "In Progress";
const Ready = "Ready";

type ItemTypesType = {
  BACKLOG: typeof Backlog;
  TODO: typeof ToDo;
  INPROGRESS: typeof InProgress;
  READY: typeof Ready;
};

const ItemTypes: ItemTypesType = {
  BACKLOG: "Backlog",
  TODO: "To Do",
  INPROGRESS: "In Progress",
  READY: "Ready",
};

export const Tasks: React.FC = (props) => {
  const tasks = useSelector(getTasks);
  const modalIsActive = useSelector(getModalIsActive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksFetch());
  }, []);

  //let tasks = [];
  //if (!projectsIsFetching)
  type taskItemsByStatusesType = {
    BACKLOG: null | string;
    TODO: null | string;
    INPROGRESS: null | string;
    READY: null | string;
  };
  let taskItemsByStatuses: taskItemsByStatusesType = {
    BACKLOG: null,
    TODO: null,
    INPROGRESS: null,
    READY: null,
  };
  for (let i in ItemTypes) {
    //@ts-ignore
    taskItemsByStatuses[i] = tasks
      //@ts-ignore
      .filter((item) => item.status === ItemTypes[i])
      .map((item) => {
        return (
          <div className="group-wrapper" key={item.id}>
            <TaskItem task={item} />
          </div>
        );
      });
  }
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
    <div className="container">
      <div className="double-row">
        <div className="backlogTasks group">{taskItemsByStatuses.BACKLOG}</div>
        <div className="todoTasks group">{taskItemsByStatuses.TODO}</div>
      </div>
      <div className="double-row">
        <div className="inProgressTasks group">
          {taskItemsByStatuses.INPROGRESS}
        </div>
        <div className="readyTasks group">{taskItemsByStatuses.READY}</div>
      </div>
      {modalIsActive ? <ShowTaskInModal show={modalIsActive} /> : null}
      <button
        title="Add task"
        className="add_task_button"
        onClick={newTask}
      ></button>
    </div>
  );
};
