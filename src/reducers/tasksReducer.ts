import { Dispatch } from "redux";
import { InferActionTypes } from "../reduxStore";
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
  description?: string;
  deadline: number;
  order: number;
};

const defaultstate = {
  tasks: [] as Array<TaskType>,
  maxId: 0 as Number,
  isFetching: null as StatusType | null,
  error: "",
  filter: "",
};
type defaultStateType = typeof defaultstate;

export const tasksReducer = (state = defaultstate, action: ActionTypes) => {
  let newState = { ...state } as defaultStateType;
  switch (action.type) {
    case "TR_SORT_TASKS":
      newState.tasks = newState.tasks.sort((a, b) => a.order - b.order);
      return newState;

    case "TR_GOT_TASKS":
      if (action.tasks) {
        newState.tasks = [...action.tasks.sort((a, b) => a.order - b.order)];
        for (let i of action.tasks)
          if (newState.maxId < i.id) newState.maxId = i.id;
      } else {
        newState.tasks = [];
        newState.maxId = 0;
      }

      return newState;
    case "TR_CHANGE_TASK":
      const index = newState.tasks.findIndex(
        (item) => item.id === action.task.id
      );
      if (index > -1) {
        const before = newState.tasks.slice(0, index);
        const after = newState.tasks.slice(index + 1);
        newState.tasks = [...before, action.task, ...after];
      } else {
        newState.tasks = [...state.tasks, action.task];
      }

      return newState;
    case "TR_DELETE_TASK":
      newState.tasks = [...state.tasks.filter((item) => item.id !== action.id)];
      return newState;

    case "TR_CREATE_TASK":
      newState.tasks = [...newState.tasks, action.task];
      return newState;
    case "TR_SET_IS_FETCHING":
      newState.isFetching = action.isFetching;
      return newState;
    case "TR_SET_FILTER":
      newState.filter = action.filter;
      return newState;
    case "TR_GOT_ERROR":
      newState.error = action.error;
      return newState;
    case "TR_CLEAR_ERROR":
      newState.error = "";
      return newState;
    default:
      return state;
  }
};
type ActionTypes = InferActionTypes<typeof actions>;

export let actions = {
  onGotTasks: (tasks: Array<TaskType>) => {
    return { tasks, type: "TR_GOT_TASKS" } as const;
  },
  onTaskChange: (task: TaskType) => {
    return { task, type: "TR_CHANGE_TASK" } as const;
  },
  onTaskCreate: (task: TaskType) => {
    return { task, type: "TR_CREATE_TASK" } as const;
  },
  onTaskDelete: (id: number) => {
    return { id, type: "TR_DELETE_TASK" } as const;
  },
  sortTasksByOrder: () => {
    return { type: "TR_SORT_TASKS" } as const;
  },
  setIsFetching: (isFetching: StatusType | null) => {
    return { isFetching, type: "TR_SET_IS_FETCHING" } as const;
  },
  setFilter: (filter: string) => {
    return { filter, type: "TR_SET_FILTER" } as const;
  },
  gotError: (error: string) => {
    return { error, type: "TR_GOT_ERROR" } as const;
  },
  clearError: () => {
    return { type: "TR_CLEAR_ERROR" } as const;
  },
};
