import { AppStateType } from "../reduxStore";
export const getTasks = (state: AppStateType) => state.tasksPage.tasks;
export const getTasksMaxId = (state: AppStateType) => state.tasksPage.maxId;
//export const getIsNewTask = (state: AppStateType) => state.modalPage.isNewTask;
export const getModalIsActive = (state: AppStateType) =>
  state.modalPage.modalIsActive;
export const getActiveTask = (state: AppStateType) =>
  state.modalPage.activeTask;
export const getTemporaryTask = (state: AppStateType) =>
  state.modalPage.temporaryTask;
export const getHesh = (state: AppStateType) =>
  state.tasksPage.tasks.map((item) => `${item.id} ${item.status}`).join("");
