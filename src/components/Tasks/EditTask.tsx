import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { StatusType, TaskType } from "../../reducers/tasksReducer";
import { Controller, useForm } from "react-hook-form";
import { taskAPI } from "../../API/taskAPI";
import { getIsNewTask } from "../../selectors/modalSelectors";
import { actions as modalActions } from "../../reducers/modalReducer";
import { getActiveTask } from "../../selectors/taskSelectors";

type EditTaskPropsType = {
  taskName: string;
  status: StatusType;
  deadline: number;
  id: number;
  order: number;
  show: boolean;
  description?: string;
};

export const EditTask: FC<EditTaskPropsType> = (props) => {
  const defaultValues = {
    status: props.status,
    taskName: props.taskName,
    description: props.description,
    deadline: new Date(props.deadline),
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
    mode: "onBlur",
  });
  const activeTask = useSelector(getActiveTask);

  const statuses = ["Backlog", "To Do", "In Progress", "Ready"];

  const selectStatus = statuses.map((item) => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });

  const dispatch = useDispatch();

  const isNewTask = useSelector(getIsNewTask);

  const onSubmit = (data: any) => {
    const date = data.deadline ? new Date(data.deadline) : new Date(1);
    const temporaryTask = {
      status: data.status,
      id: props.id,
      taskName: data.taskName,
      description: data.description,
      deadline: date.getTime(),
      order: props.order,
    } as TaskType;

    if (isNewTask) {
      dispatch(modalActions.setIsNewTask(false));
      dispatch(taskAPI.createTask(temporaryTask));
    } else dispatch(taskAPI.patchTask(temporaryTask));
    dispatch(modalActions.turnOffModal());
    //if (props.changeUrl) navigate("/");
  };

  const deleteTaskItem = () => {
    dispatch(taskAPI.deleteTask(activeTask.id));
    dispatch(modalActions.turnOffModal());
    // if (props.changeUrl) navigate("/");
  };

  const handleCancelClose = () => {
    dispatch(modalActions.turnOffModal());
    // if (props.changeUrl) navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group form-control-lg">
        <div className="input-group mb-3">
          <label htmlFor="status" className="input-group-text">
            Status
          </label>

          <select {...register("status")}>{selectStatus}</select>
        </div>

        <div className="input-group mb-3">
          <label htmlFor="taskName" className="input-group-text">
            Task name
          </label>
          <input
            {...register("taskName", {
              required: true,
              minLength: { value: 6, message: "Not less then 6 symbols" },
            })}
            defaultValue={props.taskName}
          />
        </div>
        {errors?.taskName && (
          <p>{errors?.taskName?.message || "Обязательный реквизит"}</p>
        )}
        <div className="input-group mb-3">
          <label htmlFor="description" className="input-group-text">
            Description
          </label>
          <input
            {...register("description", {
              required: true,
              minLength: { value: 6, message: "Not less then 6 symbols" },
            })}
            defaultValue={props.description}
          />
        </div>
        {errors?.description && (
          <p>{errors?.description?.message || "Обязательный реквизит"}</p>
        )}
        <div className="input-group mb-3">
          <label htmlFor="deadline" className="input-group-text">
            Deadline date
          </label>

          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="form-control"
                selected={field.value}
                // onChange={(date) => setDeadlineState(date as Date)}
                onChange={(e) => field.onChange(e)}
                // onCalendarClose={() => Blur("deadline")}
                name="deadline"
                id="deadline"
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
          {/* <div id="deadlinediv" className="form-control"> */}
          {/* <DatePicker
            className="form-control"
            selected={deadlineState}
            onChange={(date) => setDeadlineState(date as Date)}
            onCalendarClose={() => Blur("deadline")}
            name="deadline"
            id="deadline"
            dateFormat="dd/MM/yyyy"
          /> */}
          <input type="submit" className="btn btn-primary" />
          <input
            type="button"
            onClick={deleteTaskItem}
            className="btn btn-warning"
            value="Delete"
          />

          <input
            className="btn btn-danger"
            onClick={handleCancelClose}
            value="Cancel"
          />
        </div>
      </div>
    </form>
  );
};
