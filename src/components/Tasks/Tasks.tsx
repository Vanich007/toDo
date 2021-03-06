import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style/Tasks.scss";
import {
  Backlog,
  toDo,
  inProgress,
  ready,
  TaskType,
  StatusType,
} from "../../reducers/tasksReducer";
import {
  getFilter,
  getIsFetching,
  getModalIsActive,
  getTasks,
  getTasksMaxId,
} from "../../selectors/taskSelectors";
import { ShowTaskInModal } from "../Modal/Modal";
import { actions } from "../../reducers/modalReducer";
import { TasksGroup } from "./TasksGroup";
import { useDrop } from "react-dnd";
import { actions as tasksActions } from "../../reducers/tasksReducer";
import { Loader } from "../Loader/Loader";
import { Filter } from "../Filter/Filter";
// import { useHistory } from "react-router";
import { taskAPI } from "../../API/taskAPI";
import { useNavigate } from "react-router";

const ItemTypes = [Backlog, toDo, inProgress, ready];
export interface DragItem {
  index: number;
  id: number;
  type: string;
  allTasksId: number;
}

export const Tasks: React.FC = () => {
  const isFetching = useSelector(getIsFetching);
  const tasks = useSelector(getTasks);
  const filter = useSelector(getFilter);
  // let hash = useSelector(getHash);
  let [grouppedTasks, setGrouppedTasks] = useState([[], [], [], []] as Array<
    Array<TaskType>
  >);
  const modalIsActive = useSelector(getModalIsActive);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  useEffect(() => {
    dispatch(taskAPI.getTasksFetch(filter)); //get Tasks from json-server
  }, [filter, dispatch]);

  useEffect(() => {
    setGrouppedTasks(
      ItemTypes.map((type) => {
        return tasks.filter((item) => item.status === type);
      })
    );
  }, [tasks]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="tasks-container">
      <div className="filter">
        <Filter />
      </div>
      <div className="double-row">
        <DroapableDiv
          className="backlog-tasks group"
          status={ItemTypes[0]}
          tasks={grouppedTasks[0]}
          allTasks={tasks}
        >
          {isFetching === ItemTypes[0] ? (
            <Loader />
          ) : (
            <TasksGroup tasks={grouppedTasks[0]} allTasks={tasks} />
          )}
        </DroapableDiv>
        <DroapableDiv
          className="todo-tasks group"
          status={ItemTypes[1]}
          tasks={grouppedTasks[1]}
          allTasks={tasks}
        >
          {isFetching === ItemTypes[1] ? (
            <Loader />
          ) : (
            <TasksGroup tasks={grouppedTasks[1]} allTasks={tasks} />
          )}
        </DroapableDiv>
      </div>
      <div className="double-row">
        <DroapableDiv
          className="in-progress-tasks group"
          status={ItemTypes[2]}
          tasks={grouppedTasks[2]}
          allTasks={tasks}
        >
          {isFetching === ItemTypes[2] ? (
            <Loader />
          ) : (
            <TasksGroup tasks={grouppedTasks[2]} allTasks={tasks} />
          )}
        </DroapableDiv>

        <DroapableDiv
          className="ready-tasks group"
          status={ItemTypes[3]}
          tasks={grouppedTasks[3]}
          allTasks={tasks}
        >
          {isFetching === ItemTypes[3] ? (
            <Loader />
          ) : (
            <TasksGroup tasks={grouppedTasks[3]} allTasks={tasks} />
          )}
        </DroapableDiv>
      </div>
      {modalIsActive && <ShowTaskInModal show={modalIsActive} changeUrl={true} />}

      <button
        title="Search"
        className="search-button"
        onClick={() => navigate("/search")}
      ></button>
      <button
        title="Add task"
        className="add-task-button"
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
  const [, drop] = useDrop({
    accept: "item",
    drop: (item: DragItem, monitor) => {
      const droppedAllTasksIndex = item.allTasksId;
      if (props.allTasks[droppedAllTasksIndex].status === props.status)
        return null;

      dispatch(tasksActions.setIsFetching(props.status as StatusType));
      patchOrder({
        ...props.allTasks[droppedAllTasksIndex],
        status: props.status as StatusType,
      }).then(() => {
        dispatch(tasksActions.setIsFetching(null));
      });
    },
  });
  const patchOrder = async (task: TaskType) => {
    await dispatch(taskAPI.patchTask(task));
  };
  return (
    <div key={props.className} ref={drop} className={props.className}>
      {props.children}
    </div>
  );
});
