import { tasksReducer } from "./reducers/tasksReducer";
import { modalReducer } from "./reducers/modalReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  tasksPage: tasksReducer,
  modalPage: modalReducer,
});

type RootReducerType = typeof reducers;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<InferValueTypes<T>>;

export type AppStateType = ReturnType<RootReducerType>;
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
