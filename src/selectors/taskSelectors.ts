import { AppStateType } from "../reduxStore";
export const getTasks = (state: AppStateType) => state.tasksPage.tasks;
export const getModalIsActive = (state: AppStateType) =>
  state.modalPage.modalIsActive;
export const getActiveTask = (state: AppStateType) =>
  state.modalPage.activeTask;
export const getTemporaryTask = (state: AppStateType) =>
  state.modalPage.temporaryTask;
