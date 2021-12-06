import { TaskType } from "./tasksReducer";
import { InferActionTypes } from "../reduxStore";

type defaultStateType = {
  activeTask: TaskType;
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

const defaultState: defaultStateType = {
  activeTask: clearTask,
  modalIsActive: false,
  isNewTask: false,
};

export const modalReducer = (state = defaultState, action: ActionTypes) => {
  let newState = { ...state };
  switch (action.type) {
    case "MR_SET_MODAL_TASK":
      if (action.task) {
        newState.activeTask = { ...action.task };
        newState.modalIsActive = true;
      }
      return newState;
    case "MR_TURN_OFF_MODAL":
      newState.modalIsActive = false;

      return newState;

    case "MR_SET_IS_NEW_TASK":
      newState.isNewTask = action.isNew;
      return newState;
    default:
      return state;
  }
};
export type ActionTypes = InferActionTypes<typeof actions>;

export let actions = {
  setModalTask: (task: TaskType) => {
    return { task, type: "MR_SET_MODAL_TASK" } as const;
  },
  turnOffModal: () => {
    return { type: "MR_TURN_OFF_MODAL" } as const;
  },
  setIsNewTask: (isNew: boolean) => {
    return { isNew, type: "MR_SET_IS_NEW_TASK" } as const;
  },
};
