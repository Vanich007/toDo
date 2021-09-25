import { InferActionTypes } from "../reduxStore";
import  {Dispatch} from 'redux';
const Backlog="Backlog", toDo="To Do",inProgress ="In Progress",ready='Ready'
type StatusType=typeof Backlog|typeof toDo|typeof inProgress|typeof ready
export type TaskType={
    status: StatusType,
    id: number,
    taskName: string,
    deadline: number,
}

const defaultstate = {
    tasks: [
      {
        status: "Backlog",
        id: 1,
        taskName: "Todo1",
        deadline: 1635488644486,
      },
      {
        status: "To Do",
        id: 2,
        taskName: "Todo2",
        deadline: 1632494447545,
      },
      {
        status: "In Progress",
        id: 3,
        taskName: "Todo3",
        deadline: 1633498544486,
      },
      {
        status: "Ready",
        id: 4,
        taskName: "Todo4",
        deadline: 1632488544486,
      },
      {
        status: "Backlog",
        id: 5,
        taskName: "Todo5",
        deadline: 1635488644486,
      },
      {
        status: "To Do",
        id: 6,
        taskName: "Todo6",
        deadline: 1632494447545,
      },
      {
        status: "In Progress",
        id: 7,
        taskName: "Todo7",
        deadline: 1633498544486,
      },
      {
        status: "Ready",
        id: 8,
        taskName: "Todo8",
        deadline: 1632488544486,
      },
    ] as Array<TaskType>
  }; 


export const tasksReducer = (state = defaultstate, action: ActionTypes) => {
  let newState = { ...state };
  switch (action.type) {
    
    case "GOTTASKS":
      if (action.tasks) {
        newState.tasks = [...action.tasks];
      } else {
        newState.tasks = [];
      }
      return newState;


    default:
      return state;
  }
};
type ActionTypes = InferActionTypes<typeof actions>;
type DispatchType=Dispatch<ActionTypes>

export let actions = {
  onGotTasks: (tasks: Array<TaskType>) => {
    return { tasks, type: "GOTTASKS" } as const;
  },

};


export const getTasksFetch = () => {
  return (dispatch:DispatchType) => {
    const token = localStorage.token;
    if (token) {
      return fetch("http://localhost:5000/tasks", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          
          if (data.message) {
            console.error(data.message)
          } else {
            dispatch(actions.onGotTasks(data.tasks))
          }
        })
    }
  }
}