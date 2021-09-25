import { TaskType } from "./tasksReducer";
import { InferActionTypes } from "../reduxStore";

type defaultstateType = {
  activeTask: TaskType;
  modalIsActive: boolean;
};

const clearTask: TaskType = {
  status: "To Do",
  id: 0,
  taskName: "",
  deadline: 0,
};

const defaultstate: defaultstateType = {
  activeTask: clearTask,
  modalIsActive: false,
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
};
