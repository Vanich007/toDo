import {tasksReducer} from "./reducers/tasksReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  tasksPage: tasksReducer,
});

type RootReducerType = typeof reducers;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

//type actions = profileAC;
export type InferActionTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<InferValueTypes<T>>;

export type AppStateType = ReturnType<RootReducerType>;
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
