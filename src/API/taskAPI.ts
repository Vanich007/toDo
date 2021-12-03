import { DispatchType } from "../reducers/tasksReducer";
import { actions, TaskType } from "../reducers/tasksReducer";

// const timeout = new Promise((resolve, reject) => {
//   setTimeout(resolve, 2500, {
//     message: "Server is not responding",
//   });
// });
// type responceDataType={
//   message?:string
//   value:unknown
// }
const PORT = 5001;

export const taskAPI = {
  getTasksFetch: (filter: string, page: number = 1, limit: number = 100) => {
    return (dispatch: DispatchType) => {
      return fetch(
        `http://localhost:${PORT}/tasks${
          filter ? filter + "&" : ""
        }?_page=${page}${limit ? "&_limit=" + limit : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())

        .then((data) => {
          if (data.message) {
            dispatch(actions.gotError(data.message));
          } else {
            dispatch(actions.onGotTasks(data));
          }
        })
        .catch((error) => dispatch(actions.gotError(error)));
    };
  },

  patchTask: (task: TaskType) => {
    return (dispatch: DispatchType) => {
      return fetch(`http://localhost:${PORT}/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message) {
            dispatch(actions.gotError(data.message));
          } else {
            dispatch(actions.onTaskChange(data));
          }
        });
    };
  },

  deleteTask: (id: number) => {
    return (dispatch: DispatchType) => {
      return fetch(`http://localhost:${PORT}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message) {
            dispatch(actions.gotError(data.message));
          } else {
            dispatch(actions.onTaskDelete(id));
          }
        });
    };
  },

  createTask: (task: TaskType) => {
    return (dispatch: DispatchType) => {
      const time = new Promise(function (resolve) {
        setTimeout(() => {
          let res = { message: "Server don't response" };
          return res;
        }, 3000);
      });

      return Promise.race([
        fetch(`http://localhost:${PORT}/tasks/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }),
        time,
      ])
        .then((resp: any) => resp.json())
        .then((data) => {
          if (data.message) {
            dispatch(actions.gotError(data.message));
          } else {
            dispatch(actions.onTaskCreate(data));
          }
        });
    };
  },
};
