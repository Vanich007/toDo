import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Modal from '../common/Modal'
import style from "./Tasks.module.css";

export function TaskItem(props) {
  const deadlineDate = new Date(props.task.deadline);
  const deadlineDateFormatted = `${deadlineDate.getDate()}.${
    deadlineDate.getMonth() + 1
  }.${deadlineDate.getFullYear()}`;

  const deadlinesoon = deadlineDate - Date.now() > 259200000 ? false : true;
  const deadlineoff = Date.now() > deadlineDate ? true : false;

  return (
    <div
      className={`${style.task_item} ${
        deadlinesoon ? style.deadlinesoon : null
      } ${deadlineoff ? style.deadlineoff : null}`}
    >
      <div className={style.taskname}>{props.task.taskName}</div>
      {deadlineDateFormatted}
    </div>
  );
}
