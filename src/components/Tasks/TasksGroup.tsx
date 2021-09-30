import React, { useState, useCallback, useEffect } from "react";
import { TaskItem } from "./TaskItem";
import { TaskType } from "../../reducers/tasksReducer";
import "./Tasks.scss";

type TasksGroupProps = {
  tasks: Array<TaskType>;
};

export const TasksGroup: React.FC<TasksGroupProps> = (props) => {
  let [tasks, setTasks] = useState([...props.tasks]);
  useEffect(() => {
    setTasks([...props.tasks]);
  }, [props.tasks]);

  const moveTaskListItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = tasks[dragIndex];
      const hoverItem = tasks[hoverIndex];
      setTasks((tasks) => {
        const updatedTasks = [...tasks];
        updatedTasks[dragIndex] = hoverItem;
        updatedTasks[hoverIndex] = dragItem;
        return updatedTasks;
      });
    },
    [tasks]
  );

  let taskItemsByStatuses = tasks.map((item, index) => {
    return (
      <div className="item-wrapper" key={item.id}>
        <TaskItem
          index={index}
          text={item.taskName}
          moveListItem={moveTaskListItem}
          key={item.id}
          task={item}
        />
      </div>
    );
  });

  return <>{taskItemsByStatuses}</>;
};
