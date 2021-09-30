import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Tasks.scss";
import {
  getTasksFetch,
  Backlog,
  toDo,
  inProgress,
  ready,
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

export const Tasks: React.FC = () => {
  const tasks = useSelector(getTasks);
  const modalIsActive = useSelector(getModalIsActive);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksFetch());
  }, []);

  const grouppedTasks = ItemTypes.map((type) => {
    return tasks.filter((item) => item.status === type);
  });

  let id = useSelector(getTasksMaxId) as number;
  id++;
  const newTask = () => {
    const deadline = Date.now();
    dispatch(
      actions.setModalTask({
        id,
        status: toDo,
        taskName: "New Task",
        deadline,
      })
    );
  };

  // useDrop - the list item is also a drop area

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

const DroapableDiv = (props: any) => {
  const dispatch = useDispatch();
  const [spec, drop] = useDrop({
    accept: "item",
    drop: (item: any, monitor) => {
      console.log(props.className, item.allTasksId);

      const droppedAllTasksIndex = item.allTasksId;
      if (props.allTasks[droppedAllTasksIndex].status === props.status)
        return null;
      //изменить статус  на статус группы-приемника
      dispatch(
        tasksActions.onChangeTaskStatus(
          props.allTasks[droppedAllTasksIndex].id,
          props.status
        )
      );
    },
  });

  return (
    <div ref={drop} className={props.className}>
      {props.children}
    </div>
  );
};
