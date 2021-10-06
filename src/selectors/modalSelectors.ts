import { AppStateType } from "../reduxStore";
export const getIsNewTask = (state: AppStateType) => state.modalPage.isNewTask;
