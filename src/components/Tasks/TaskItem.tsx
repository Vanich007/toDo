import { useRef, FC, memo } from "react";
import "./Tasks.scss";
import { TaskType } from "../../reducers/tasksReducer";
import { actions as modalActions } from "../../reducers/modalReducer";
import { useDispatch } from "react-redux";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";

type TaskItemPropsType = {
  task: TaskType;
  index: number;
  moveListItem: any;
  allTasksId: number;
};

export const TaskItem: FC<TaskItemPropsType> = memo(
  ({ allTasksId, index, moveListItem, task }) => {
    const [{ isDragging }, dragRef] = useDrag({
      type: "item",
      item: { index, allTasksId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    interface DragItem {
      index: number;
      id: string;
      type: string;
      allTasksId: number;
    }

    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
      accept: "item",
      hover: (item: DragItem, monitor) => {
        const dragIndex = item.index;
        const hoverIndex = index;
        const dragAllTasksIndex = item.allTasksId;
        const hoverAllTasksIndex = allTasksId;
        //console.log(dragIndex, dragAllTasksIndex, hoverIndex, hoverAllTasksIndex);
        //@ts-ignore
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        if (hoverBoundingRect !== undefined) {
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

          const hoverActualY =
            //@ts-ignore
            monitor.getClientOffset().y - hoverBoundingRect.top;

          // if dragging down, continue only when hover is smaller than middle Y
          if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
          // if dragging up, continue only when hover is bigger than middle Y
          if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
        }
        moveListItem(
          dragIndex,
          hoverIndex,
          dragAllTasksIndex,
          hoverAllTasksIndex
        );
        item.index = hoverIndex;
      },
    });

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0 : 1;

    const dispatch = useDispatch();

    // let [showModal, setShowModal] = useState(false);

    const deadlineDate = new Date(task.deadline);
    const deadlineDateFormatted = `${deadlineDate.getDate()}.${
      deadlineDate.getMonth() + 1
    }.${deadlineDate.getFullYear()}`;

    const deadlinesoon =
      +deadlineDate - Date.now() > 259200000 || task.status === "Ready"
        ? false
        : true;
    const deadlineoff =
      Date.now() > +deadlineDate && task.status !== "Ready" ? true : false;
    const setModalTask = () => {
      dispatch(modalActions.setModalTask(task));
    };

    return (
      <>
        <div
          //@ts-ignore
          ref={dragDropRef}
          style={{ opacity }}
          onClick={setModalTask}
          className={`task_item ${deadlinesoon ? "deadlinesoon" : ""} ${
            deadlineoff ? "deadlineoff" : ""
          }`}
        >
          <div className="taskname">{task.taskName}</div>
          {deadlineDateFormatted}
        </div>
      </>
    );
  }
);
