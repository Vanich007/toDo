import { DispatchType } from "../reducers/tasksReducer";
import { actions, TaskType } from "../reducers/tasksReducer";

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
            console.error(data.message);
          } else {
            dispatch(actions.onGotTasks(data));
          }
        });
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
            console.error(data.message);
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
            console.error(data.message);
          } else {
            dispatch(actions.onTaskDelete(id));
          }
        });
    };
  },

  createTask: (task: TaskType) => {
    return (dispatch: DispatchType) => {
      return fetch(`http://localhost:${PORT}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message) {
            console.error(data.message);
          } else {
            dispatch(actions.onTaskCreate(data));
          }
        });
    };
  },
};
