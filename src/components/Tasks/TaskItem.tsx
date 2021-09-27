import "./Tasks.scss";
import { TaskType } from "../../reducers/tasksReducer";
//import { ShowTaskInModal } from "../Modal/Modal";
import { actions as modalActions } from "../../reducers/modalReducer";
import { useDispatch } from "react-redux";
type TaskItemPropsType = { task: TaskType };

export function TaskItem(props: TaskItemPropsType) {
  const dispatch = useDispatch();

  // let [showModal, setShowModal] = useState(false);

  const deadlineDate = new Date(props.task.deadline);
  const deadlineDateFormatted = `${deadlineDate.getDate()}.${
    deadlineDate.getMonth() + 1
  }.${deadlineDate.getFullYear()}`;

  const deadlinesoon =
    +deadlineDate - Date.now() > 259200000 || props.task.status === "Ready"
      ? false
      : true;
  const deadlineoff =
    Date.now() > +deadlineDate && props.task.status !== "Ready" ? true : false;
  const setModalTask = () => {
    dispatch(modalActions.setModalTask(props.task));
  }; //props.setModalTask(props.task);

  return (
    <div
      onClick={setModalTask}
      className={`task_item ${deadlinesoon ? "deadlinesoon" : null} ${
        deadlineoff ? "deadlineoff" : null
      }`}
    >
      <div className="taskname">{props.task.taskName}</div>
      {deadlineDateFormatted}
    </div>
  );
}
