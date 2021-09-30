import { InferActionTypes } from "../reduxStore";
//import { Dispatch } from "redux";
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
};

const defaultstate = {
  tasks: [] as Array<TaskType>,
  maxId: 0 as Number,
};
type defaultStateType = typeof defaultstate;

export const tasksReducer = (state = defaultstate, action: ActionTypes) => {
  let newState = { ...state } as defaultStateType;
  switch (action.type) {
    case "GOTTASKS":
      if (action.tasks) {
        newState.tasks = [...action.tasks];
        for (let i of action.tasks)
          if (newState.maxId < i.id) newState.maxId = i.id;
      } else {
        newState.tasks = [];
        newState.maxId = 0;
      }

      return newState;
    case "CHANGETASK":
      const index = newState.tasks.findIndex(
        (item) => item.id === action.task.id
      );
      if (index > -1) {
        const before = newState.tasks.slice(0, index);
        const after = newState.tasks.slice(index + 1);
        newState.tasks = [...before, action.task, ...after];
      } else newState.tasks = [...state.tasks, action.task];

      return newState;
    case "DELETETASK":
      newState.tasks = [...state.tasks.filter((item) => item.id !== action.id)];
      return newState;
    case "CHANGETASKSTATUS":
      state.tasks[state.tasks.findIndex((i) => i.id === action.id)].status =
        action.status;
      newState.tasks = [...state.tasks];
      return newState;
    default:
      return state;
  }
};
type ActionTypes = InferActionTypes<typeof actions>;
//type DispatchType = Dispatch<ActionTypes>;

export let actions = {
  onGotTasks: (tasks: Array<TaskType>) => {
    return { tasks, type: "GOTTASKS" } as const;
  },
  onTaskChange: (task: TaskType) => {
    return { task, type: "CHANGETASK" } as const;
  },
  onTaskDelete: (id: number) => {
    return { id, type: "DELETETASK" } as const;
  },
  onChangeTaskStatus: (id: number, status: StatusType) => {
    return { id, status, type: "CHANGETASKSTATUS" } as const;
  },
};

export const getTasksFetch = () => {
  return (dispatch: any) => {
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
