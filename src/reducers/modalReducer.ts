import { TaskType } from "./tasksReducer";
import { InferActionTypes } from "../reduxStore";

type defaultstateType = {
  activeTask: TaskType;
  temporaryTask: TaskType;
  modalIsActive: boolean;
  isNewTask: boolean;
};

const clearTask: TaskType = {
  status: "To Do",
  id: 0,
  taskName: "",
  deadline: 0,
  order: 0,
};

const defaultstate: defaultstateType = {
  activeTask: clearTask,
  temporaryTask: clearTask,
  modalIsActive: false,
  isNewTask: false,
};

export const modalReducer = (state = defaultstate, action: ActionTypes) => {
  let newState = { ...state };
  switch (action.type) {
    case "SETMODALTASK":
      if (action.task) {
        newState.activeTask = action.task;
        newState.modalIsActive = true;
      }
      return newState;
    case "TURNOFFMODAL":
      newState.modalIsActive = false;

      return newState;
    case "SETTEMPORARYTASK":
      newState.temporaryTask = action.task;

      return newState;

    default:
      return state;
  }
};
export type ActionTypes = InferActionTypes<typeof actions>;

export let actions = {
  setModalTask: (task: TaskType) => {
    return { task, type: "SETMODALTASK" } as const;
  },
  turnOffModal: () => {
    return { type: "TURNOFFMODAL" } as const;
  },
  setTemporaryTaskData: (task: TaskType) => {
    return { task, type: "SETTEMPORARYTASK" } as const;
  },
};
