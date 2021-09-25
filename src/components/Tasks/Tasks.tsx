import {useEffect} from 'react'
import { connect } from "react-redux";
import { TaskItem } from "./TaskItem";
import style from "./Tasks.module.scss";
import { AppStateType } from "../../reduxStore";
import {TaskType,getTasksFetch} from '../../reducers/tasksReducer'
import {ShowTaskInModal} from '../Modal/Modal'

type TasksPropsType={tasks:Array<TaskType>,getTasksFetch:any}

const Tasks = (props:TasksPropsType) => {

useEffect(()=>{
  props.getTasksFetch()
},[])

  //let tasks = [];
  //if (!projectsIsFetching)

  const backlogTasks = props.tasks
    .filter((item) => item.status === "Backlog")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const todoTasks = props.tasks
    .filter((item) => item.status === "To Do")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const inProgressTasks = props.tasks
    .filter((item) => item.status === "In Progress")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });
  const readyTasks = props.tasks
    .filter((item) => item.status === "Ready")
    .map((item) => {
      return (
        <div key={item.id}>
          <TaskItem task={item} />
        </div>
      );
    });

  return (
    <div className={style.container}>
      <div className={`${style.backlogTasks} ${style.group}`}>
        {backlogTasks}
      </div>
      <div className={`${style.todoTasks} ${style.group}`}>{todoTasks}</div>
      <div className={`${style.inProgressTasks} ${style.group}`}>
        {inProgressTasks}
      </div>
      <div className={`${style.readyTasks} ${style.group}`}>{readyTasks}</div>
      props.modalIsActive?<ShowTaskInModal />:null
    </div>
    
  );
};

const mapStateToProps = (state:AppStateType) => {
  return {
    tasks: state.tasksPage.tasks,
    modal: state.modalPage.modalIsActive
  };
};

const TasksContainer = connect(mapStateToProps, {getTasksFetch})(Tasks);

export default TasksContainer;
