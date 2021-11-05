import React, { useState, useCallback, useEffect } from "react";
import { TaskItem } from "./TaskItem";
import { actions as tasksActions, TaskType } from "../../reducers/tasksReducer";
import "./style/Tasks.scss";
import { useDispatch } from "react-redux";
import { DragItem } from "./Tasks";
//import { getHash } from "../../selectors/taskSelectors";
import { actions as modalActions } from "../../reducers/modalReducer";
import { taskAPI } from "../../API/taskAPI";

type TasksGroupProps = {
  tasks: Array<TaskType>;
  allTasks: Array<TaskType>;
};

export const TasksGroup: React.FC<TasksGroupProps> = (props) => {
  let [tasks, setTasks] = useState(props.tasks);

  const dispatch = useDispatch();
  //const tasksHash = useSelector(getHash);

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const moveTaskListItem = useCallback(
    (
      dragIndex: number,
      hoverIndex: number,
      dragAllTasksIndex: number,
      hoverAllTasksIndex: number
    ) => {
      const localDragIndex = tasks.findIndex(
        (i) => i.id === props.allTasks[dragAllTasksIndex].id
      );
      const localHoverIndex = tasks.findIndex(
        (i) => i.id === props.allTasks[hoverAllTasksIndex].id
      );

      if (
        localDragIndex > -1 && //если оба элемента из одного столбца
        localHoverIndex > -1 //меняем местами
      ) {
        const dragItem = tasks[dragIndex];
        const hoverItem = tasks[hoverIndex];

        setTasks((tasks) => {
          const updatedTasks = [...tasks];
          updatedTasks[dragIndex] = hoverItem;
          updatedTasks[hoverIndex] = dragItem;
          return updatedTasks;
        });
      }
    },
    [tasks, props.allTasks]
  );
  const handleDrop = async (index: number, item: DragItem) => {
    dispatch(tasksActions.setIsFetching(tasks[0].status));
    await Promise.all(
      tasks.map(async function (item, i) {
        return dispatch(
          taskAPI.patchTask({
            ...item,
            order: i,
          })
        );
      })
    );
    dispatch(tasksActions.sortTasksByOrder());
    dispatch(tasksActions.setIsFetching(null));
  };

  let taskItemsByStatuses = tasks.map((item, index) => {
    const allTasksIndex = props.allTasks.findIndex((i) => i.id === item.id);
    if (allTasksIndex < 0) return null;

    return (
      <div className="item-wrapper" key={allTasksIndex}>
        <TaskItem
          setModalTask={() => {
            dispatch(modalActions.setModalTask(item));
          }}
          index={index}
          allTasksId={allTasksIndex}
          moveListItem={moveTaskListItem}
          task={item}
          onDrop={(item: DragItem) => handleDrop(index, item)}
        />
      </div>
    );
  });

  return <>{taskItemsByStatuses}</>;
};
