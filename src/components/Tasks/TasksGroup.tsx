import React, { useState, useCallback, useEffect } from "react";
import { TaskItem } from "./TaskItem";
import {
  actions as tasksActions,
  patchTask,
  TaskType,
} from "../../reducers/tasksReducer";
import "./style/Tasks.scss";
import { useDispatch, useSelector } from "react-redux";
import { DragItem } from "./Tasks";
import { getHash } from "../../selectors/taskSelectors";
import { actions as modalActions } from "../../reducers/modalReducer";

type TasksGroupProps = {
  tasks: Array<TaskType>;
  allTasks: Array<TaskType>;
};

export const TasksGroup: React.FC<TasksGroupProps> = (props) => {
  // let [lastHoverAllTasksIndex, setLastHoverAllTasksIndex] = useState(-1); //для обработки drop  - над каким элементом брошен

  let [tasks, setTasks] = useState(props.tasks); //

  const dispatch = useDispatch();
  const tasksHash = useSelector(getHash);

  useEffect(() => {
    setTasks(props.tasks);
  }, [tasksHash]);

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

      console.log("local", tasks, localDragIndex, localHoverIndex);
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
    [tasks]
  );
  const handleDrop =
    // useCallback(
    async (index: number, item: DragItem) => {
      console.log("drop");
      dispatch(tasksActions.setIsFetching(tasks[0].status));
      await Promise.all(
        tasks.map(async function (item, i) {
          //соберем данные по юзерам
          return dispatch(
            patchTask({
              ...item,
              order: i,
            })
          );
        })
      );
      dispatch(tasksActions.sortTasksByOrder());
      dispatch(tasksActions.setIsFetching(null));
      // for (let i in tasks) {
      //   await dispatch(
      //     patchTask({
      //       ...tasks[i],
      //       order: parseInt(i),
      //     })
      //   );
      // }
    };
  // ,
  //   [tasksHesh]
  // );

  let taskItemsByStatuses = tasks.map((item, index) => {
    const allTasksIndex = props.allTasks.findIndex((i) => i.id === item.id);
    return (
      <>
        <TaskItem
          setModalTask={() => {
            dispatch(modalActions.setModalTask(item));
          }}
          index={index}
          allTasksId={allTasksIndex}
          moveListItem={moveTaskListItem}
          key={item.id}
          task={item}
          onDrop={(item: DragItem) => handleDrop(index, item)}
          //{(item)=>handleDrop(index,item)}
        />
      </>
    );
  });

  return <>{taskItemsByStatuses}</>;
};
