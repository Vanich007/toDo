import { AppStateType } from "../reduxStore";
export const getTasks = (state: AppStateType) => state.tasksPage.tasks;
export const getIsFetching = (state: AppStateType) =>
  state.tasksPage.isFetching;
export const getTasksMaxId = (state: AppStateType) => state.tasksPage.maxId;
//export const getIsNewTask = (state: AppStateType) => state.modalPage.isNewTask;
export const getModalIsActive = (state: AppStateType) =>
  state.modalPage.modalIsActive;
export const getActiveTask = (state: AppStateType) =>
  state.modalPage.activeTask;
export const getFilter = (state: AppStateType) => state.tasksPage.filter;
export const getError = (state: AppStateType) => state.tasksPage.error;

export const getHash = (state: AppStateType) =>
  state.tasksPage.tasks
    .map(
      (item) =>
        `${item.id} ${item.status}${item.order}${item.taskName}${item.description}${item.deadline}`
    )
    .join("");
