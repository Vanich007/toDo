import React, { useEffect, memo } from "react";
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
  const modalIsActive = useSelector(getModalIsActive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksFetch()); //get Tasks from json-server
  }, []);

  const grouppedTasks = ItemTypes.map((type) => {
    //group array by statuses
    return tasks.filter((item) => item.status === type);
  });

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
        taskName: "New Task",
        deadline,
      })
    );
  };

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
