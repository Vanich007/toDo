import { useRef, FC, memo } from "react";
import "./style/Tasks.scss";
import { TaskType } from "../../reducers/tasksReducer";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { DragItem } from "./Tasks";
import { Card } from "react-bootstrap";
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
    const [{ isDragging }, dragRef] = useDrag({
      type: "item",
      item: { index, allTasksId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    // useDrop - the list item is also a drop area
    const [, dropRef] = useDrop({
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

    const ref = useRef<HTMLDivElement>(null);
    let dragDropRef = dragRef(dropRef(ref));

    // Make items being dragged transparent, so it's easier to see where we drop them

    const opacity = isDragging ? 0 : 1;

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
    let bg = "secondary";
    if (deadlinesoon) bg = "warning";
    if (deadlineoff) bg = "danger";
    if (task.status === "Ready") bg = "success";
    return (
      <div
        //@ts-ignore
        ref={dragDropRef}
        onClick={setModalTask}
      >
        <Card
          bg={bg}
          key={String(allTasksId) + String(task.id)}
          style={{ opacity }}
          className="mb-2"
        >
          <Card.Header>{task.taskName}</Card.Header>
          <Card.Body>
            {/* <Card.Title>{task.taskName}</Card.Title> */}
            <Card.Text>
              <span className="task-description">{task.description}</span>
              <span className="task-description">{deadlineDateFormatted}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
);
