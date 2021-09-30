import React, { useState, useCallback, useEffect } from "react";
import { TaskItem } from "./TaskItem";
import { TaskType } from "../../reducers/tasksReducer";
import "./Tasks.scss";
import { useDispatch } from "react-redux";

type TasksGroupProps = {
  tasks: Array<TaskType>;
  allTasks: Array<TaskType>;
};

export const TasksGroup: React.FC<TasksGroupProps> = (props) => {
  let [tasks, setTasks] = useState([...props.tasks]);
  const dispatch = useDispatch();

  useEffect(() => {
    setTasks([...props.tasks]);
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
      console.log("local", localDragIndex, localHoverIndex);
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
    [tasks]
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
        />
      </div>
    );
  });

  return <>{taskItemsByStatuses}</>;
};
