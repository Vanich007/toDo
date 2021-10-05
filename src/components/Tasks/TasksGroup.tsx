import React, { useState, useCallback, useEffect } from "react";
import { TaskItem } from "./TaskItem";
import { actions as tasksActions, TaskType } from "../../reducers/tasksReducer";
import "./Tasks.scss";
import { useDispatch, useSelector } from "react-redux";
import { DragItem } from "./Tasks";
import { getHesh } from "../../selectors/taskSelectors";

type TasksGroupProps = {
  tasks: Array<TaskType>;
  allTasks: Array<TaskType>;
};

export const TasksGroup: React.FC<TasksGroupProps> = (props) => {
  // let [lastHoverAllTasksIndex, setLastHoverAllTasksIndex] = useState(-1); //для обработки drop  - над каким элементом брошен

  let [tasks, setTasks] = useState(props.tasks); //.sort((a, b) => a.order - b.order

  const dispatch = useDispatch();
  const tasksHesh = useSelector(getHesh);

  useEffect(() => {
    setTasks(props.tasks);
  }, [tasksHesh]);

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

      //console.log("local", localDragIndex, localHoverIndex);
      if (
        localDragIndex > -1 && //если оба элемента из одного столбца
        localHoverIndex > -1 //меняем местами
      ) {
        const dragItem = tasks[dragIndex];
        const hoverItem = tasks[hoverIndex];

        // if (lastHoverAllTasksIndex !== hoverAllTasksIndex)
        // setLastHoverAllTasksIndex(hoverAllTasksIndex);
        setTasks((tasks) => {
          const updatedTasks = [...tasks];
          updatedTasks[dragIndex] = hoverItem;
          updatedTasks[hoverIndex] = dragItem;
          return updatedTasks;
        });
      }
    },
    [tasksHesh]
  );
  const handleDrop = useCallback(
    (index: number, item: DragItem) => {
      for (let i in tasks) {
        dispatch(
          tasksActions.onTaskChange({
            ...tasks[i],
            order: parseInt(i),
          })
        );
      }
    },
    [tasksHesh]
  );

  let taskItemsByStatuses = tasks.map((item, index) => {
    const allTasksIndex = props.allTasks.findIndex((i) => i.id === item.id);
    return (
      <div className="item-wrapper" key={item.id}>
        <TaskItem
          index={index}
          allTasksId={allTasksIndex}
          moveListItem={moveTaskListItem}
          key={item.id}
          task={item}
          onDrop={(item: DragItem) => handleDrop(index, item)}
          //{(item)=>handleDrop(index,item)}
        />
      </div>
    );
  });

  return <>{taskItemsByStatuses}</>;
};
