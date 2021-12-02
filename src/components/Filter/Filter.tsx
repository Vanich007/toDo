import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/tasksReducer";

export const Filter: FC = () => {
  const dispatch = useDispatch();

  let [description, setDescription] = useState("");
  let [taskName, setTaskName] = useState("");

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    switch (event.target.name) {
      case "taskName":
        setTaskName(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
    }
  };
  useEffect(() => {
    if (taskName && description)
      dispatch(
        actions.setFilter(
          `?taskName_like=${taskName}&description_like=${description}`
        )
      );
    else if (taskName)
      dispatch(actions.setFilter(`?taskName_like=${taskName}`));
    else if (description)
      dispatch(actions.setFilter(`?description_like=${description}`));
    else dispatch(actions.setFilter(``));
  }, [taskName, description, dispatch]);

  return (
    <>
      {/* <div className="input-group input-group-sm mb-3">
        
      </div> */}

      <div className="input-group input-group-sm mb-3">
        <div className="fw-bold p-2">Filter</div>
        <div className="row g-2">
          {/* <label htmlFor="filter_task_name" className="input-group-text">
            Task name
          </label> */}

          <input
            className="filter_task_name form-control"
            name="taskName"
            id="filter_task_name"
            placeholder="Task name"
            value={taskName}
            onChange={handleChange}
          />
        </div>

        <div className="row g-2">
          {/* <label htmlFor="filter_description" className="input-group-text">
            Description
          </label> */}
          <input
            className="filter_description form-control"
            name="description"
            id="filter_description"
            placeholder="description"
            value={description}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
