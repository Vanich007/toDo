import React, {
  useRef,
  FC,
  memo,
  LegacyRef,
  useState,
  useCallback,
} from "react";
import "./style/Tasks.scss";
import { TaskType } from "../../reducers/tasksReducer";

import { useDispatch } from "react-redux";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import { DragItem } from "./Tasks";
const THREEDAYPERIOD = 259200000;
type TaskItemPropsType = {
  task: TaskType;
  index: number;
  moveListItem: (
    dragIndex: number,
    hoverIndex: number,
    dragAllTasksIndex: number,
    hoverAllTasksIndex: number
  ) => void;
  onDrop: (item: DragItem) => void;
  allTasksId: number;
  setModalTask: () => void;
};

export const TaskItem: FC<TaskItemPropsType> = memo(
  ({ allTasksId, index, moveListItem, task, onDrop, setModalTask }) => {
    let [lastHoverIndex, setLastHoverIndex] = useState(allTasksId);
    const [{ isDragging }, dragRef] = useDrag({
      type: "item",
      item: { index, allTasksId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
      accept: "item",
      hover: (item: DragItem, monitor: DropTargetMonitor) => {
        const dragIndex = item.index;
        const hoverIndex = index;
        const dragAllTasksIndex = item.allTasksId;
        const hoverAllTasksIndex = allTasksId;

        let hoverBoundingRect;
        if (ref.current)
          hoverBoundingRect = ref.current.getBoundingClientRect();

        if (hoverBoundingRect !== undefined) {
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          let hoverActualY = 0;
          hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

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
      drop: onDrop,
    });

    const ref = useRef<HTMLInputElement>(null);

    let dragDropRef = dragRef(dropRef(ref));
    // Make items being dragged transparent, so it's easier to see where we drop them

    const opacity = isDragging ? 0 : 1;

    // let [showModal, setShowModal] = useState(false);

    const deadlineDate = new Date(task.deadline);
    const deadlineDateFormatted = `${deadlineDate.getDate()}.${
      deadlineDate.getMonth() + 1
    }.${deadlineDate.getFullYear()}`;

    const deadlinesoon =
      +deadlineDate - Date.now() > THREEDAYPERIOD || task.status === "Ready"
        ? false
        : true;
    const deadlineoff =
      Date.now() > +deadlineDate && task.status !== "Ready" ? true : false;

    return (
      <div
        key={task.id}
        //@ts-ignore
        ref={dragDropRef}
        style={{ opacity }}
        onClick={setModalTask}
        className={`task-item ${deadlinesoon ? "deadline-soon" : ""} ${
          deadlineoff ? "deadline-off" : ""
        } ${task.status === "Ready" ? "ready" : ""}`}
      >
        <div className="task-title">{task.taskName}</div>
        <div className="task-description">{task.description}</div>
        {/* {deadlineDateFormatted} */}
      </div>
    );
  }
);
