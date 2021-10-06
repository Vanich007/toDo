import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Tasks.scss";
import {
  getTasksFetch,
  Backlog,
  toDo,
  inProgress,
  ready,
  TaskType,
  StatusType,
  patchTask,
} from "../../reducers/tasksReducer";
import {
  getHash,
  getModalIsActive,
  getTasks,
  getTasksMaxId,
} from "../../selectors/taskSelectors";
import { ShowTaskInModal } from "../Modal/Modal";
import { actions } from "../../reducers/modalReducer";
import { TasksGroup } from "./TasksGroup";
import { useDrop } from "react-dnd";
import { actions as tasksActions } from "../../reducers/tasksReducer";

const ItemTypes = [Backlog, toDo, inProgress, ready];
export interface DragItem {
  index: number;
  id: number;
  type: string;
  allTasksId: number;
}

export const Tasks: React.FC = () => {
  const tasks = useSelector(getTasks);
  let hash = useSelector(getHash);

  let grouppedTasks = ItemTypes.map((type) => {
    return tasks.filter((item) => item.status === type);
  });

  console.log("tasks", tasks, hash);
  console.log("grouppedTasks", grouppedTasks);

  const modalIsActive = useSelector(getModalIsActive);
  const dispatch = useDispatch();
  useEffect(() => {
    hash = tasks.map((item) => `${item.id} ${item.status}`).join("");
  }, [tasks]);

  useEffect(() => {
    dispatch(getTasksFetch()); //get Tasks from json-server
  }, []);

  useEffect(() => {
    grouppedTasks = ItemTypes.map((type) => {
      return tasks.filter((item) => item.status === type);
    });
  }, [hash]);

  let id = useSelector(getTasksMaxId) as number;
  id++;

  const newTask = () => {
    const deadline = Date.now();
    dispatch(
      actions.setModalTask({
        //form data for Modal editing window
        id,
        status: toDo,
        order: id,
        description: "",
        taskName: "New Task",
        deadline,
      })
    );
    dispatch(actions.setIsNewTask(true));
  };

  useEffect(() => {
    console.log(grouppedTasks);
    for (let i = 0; i <= 3; i++) {
      for (let t in grouppedTasks[i]) {
        dispatch(
          tasksActions.onTaskChange({
            ...grouppedTasks[i][t],
            order: parseInt(t),
          })
        );
      }
    }
  }, []);

  console.log(grouppedTasks);
  return (
    <div className="container">
      <div className="double-row">
        <DroapableDiv
          className="backlogTasks group"
          status={ItemTypes[0]}
          tasks={grouppedTasks[0]}
          allTasks={tasks}
        >
          <TasksGroup tasks={grouppedTasks[0]} allTasks={tasks} />
        </DroapableDiv>
        <DroapableDiv
          className="todoTasks group"
          status={ItemTypes[1]}
          tasks={grouppedTasks[1]}
          allTasks={tasks}
        >
          <TasksGroup tasks={grouppedTasks[1]} allTasks={tasks} />
        </DroapableDiv>
      </div>
      <div className="double-row">
        <DroapableDiv
          className="inProgressTasks group"
          status={ItemTypes[2]}
          tasks={grouppedTasks[2]}
          allTasks={tasks}
        >
          <TasksGroup tasks={grouppedTasks[2]} allTasks={tasks} />
        </DroapableDiv>

        <DroapableDiv
          className="readyTasks group"
          status={ItemTypes[3]}
          tasks={grouppedTasks[3]}
          allTasks={tasks}
        >
          <TasksGroup tasks={grouppedTasks[3]} allTasks={tasks} />
        </DroapableDiv>
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

type DroapableDivPropsType = {
  allTasks: Array<TaskType>;
  className: string;
  status: string;
  tasks: Array<TaskType>;
  children: JSX.Element;
};

const DroapableDiv = memo((props: DroapableDivPropsType) => {
  const dispatch = useDispatch();
  const [spec, drop] = useDrop({
    accept: "item",
    drop: (item: DragItem, monitor) => {
      const droppedAllTasksIndex = item.allTasksId;
      if (props.allTasks[droppedAllTasksIndex].status === props.status)
        return null;
      //if item with another status, change status

      // dispatch(
      //   tasksActions.onChangeTaskStatus(
      //     props.allTasks[droppedAllTasksIndex].id,
      //     props.status as StatusType
      //   )
      // );
      dispatch(
        patchTask({
          ...props.allTasks[droppedAllTasksIndex],
          status: props.status as StatusType,
        })
      );
    },
  });

  return (
    <div ref={drop} className={props.className}>
      {props.children}
    </div>
  );
});
