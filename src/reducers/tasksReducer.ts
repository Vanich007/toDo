import { Dispatch } from "redux";
import { InferActionTypes } from "../reduxStore";

//import { Dispatch } from "redux";
export type DispatchType = Dispatch<ActionTypes>;

export const Backlog = "Backlog",
  toDo = "To Do",
  inProgress = "In Progress",
  ready = "Ready";
export type StatusType =
  | typeof Backlog
  | typeof toDo
  | typeof inProgress
  | typeof ready;
export type TaskType = {
  status: StatusType;
  id: number;
  taskName: string;
  deadline: number;
  order: number;
};

const defaultstate = {
  tasks: [] as Array<TaskType>,
  maxId: 0 as Number,
};
type defaultStateType = typeof defaultstate;

export const tasksReducer = (state = defaultstate, action: ActionTypes) => {
  let newState = { ...state } as defaultStateType;
  switch (action.type) {
    case "GOT_TASKS":
      if (action.tasks) {
        newState.tasks = [...action.tasks.sort((a, b) => a.order - b.order)];
        for (let i of action.tasks)
          if (newState.maxId < i.id) newState.maxId = i.id;
      } else {
        newState.tasks = [];
        newState.maxId = 0;
      }

      return newState;
    case "CHANGE_TASK":
      const index = newState.tasks.findIndex(
        (item) => item.id === action.task.id
      );
      if (index > -1) {
        const before = newState.tasks.slice(0, index);
        const after = newState.tasks.slice(index + 1);
        newState.tasks = [...before, action.task, ...after];
      } else newState.tasks = [...state.tasks, action.task];

      return newState;
    case "DELETE_TASK":
      newState.tasks = [...state.tasks.filter((item) => item.id !== action.id)];
      return newState;
    case "CHANGE_ORDER":
      // const tempOrder1 = newState.tasks[action.id1].order;
      // newState.tasks[action.id1].order = newState.tasks[action.id2].order;
      newState.tasks[action.id2].order = newState.tasks[action.id1].order - 1;

      return newState;
    default:
      return state;
  }
};
type ActionTypes = InferActionTypes<typeof actions>;

export let actions = {
  onGotTasks: (tasks: Array<TaskType>) => {
    return { tasks, type: "GOT_TASKS" } as const;
  },
  onTaskChange: (task: TaskType) => {
    return { task, type: "CHANGE_TASK" } as const;
  },
  onTaskDelete: (id: number) => {
    return { id, type: "DELETE_TASK" } as const;
  },
  onChangeOrder: (id1: number, id2: number) => {
    return { id1, id2, type: "CHANGE_ORDER" } as const;
  },
};

export const getTasksFetch = () => {
  return (dispatch: DispatchType) => {
    return fetch("http://localhost:5000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          dispatch(actions.onGotTasks(data));
        }
      });
  };
};

export const patchTask = (task: TaskType) => {
  return (dispatch: DispatchType) => {
    return fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          dispatch(actions.onTaskChange(data));
        }
      });
  };
};
