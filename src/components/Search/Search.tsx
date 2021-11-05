import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Tasks/style/Tasks.scss";

import { TaskType } from "../../reducers/tasksReducer";
import {
  getFilter,
  getIsFetching,
  getTasks,
} from "../../selectors/taskSelectors";
import { getModalIsActive } from "../../selectors/taskSelectors";
import { ShowTaskInModal } from "../Modal/Modal";
import { actions as modalActions } from "../../reducers/modalReducer";

import { actions as tasksActions } from "../../reducers/tasksReducer";
import { Loader } from "../Loader/Loader";
import { Filter } from "../Filter/Filter";
import { TaskItem } from "../Tasks/TaskItem";
import { JsxElement } from "typescript";
import { SearchTerms } from "./SearchTerms";
import { taskAPI } from "../../API/taskAPI";

export interface DragItem {
  index: number;
  id: number;
  type: string;
  allTasksId: number;
}

export const Search: React.FC = () => {
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const modalIsActive = useSelector(getModalIsActive);
  const tasks = useSelector(getTasks) as Array<TaskType>;
  const filter = useSelector(getFilter);
  // let hash = useSelector(getHash);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(taskAPI.getTasksFetch(filter, currentPage, pageLimit)); //get Tasks from json-server
  }, [filter, currentPage, pageLimit]);

  const limitPerPage = (page: number, limit: number) => {
    dispatch(taskAPI.getTasksFetch(filter, page, limit));
    setCurrentPage(page);
  };
  const renderLinks = () => {
    // } else if (tasks.length === pageLimit) {
    return (
      <ul className="pagination">
        {currentPage === 1 ? (
          ""
        ) : (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => limitPerPage(currentPage - 1, pageLimit)}
            >
              Back
            </a>
          </li>
        )}
        <li className="page-item">
          <span className="page-link">Page {currentPage}</span>
        </li>
        {tasks.length === pageLimit ? (
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => limitPerPage(currentPage + 1, pageLimit)}
            >
              Next
            </a>
          </li>
        ) : (
          ""
        )}
      </ul>
    );
  };

  let taskItems = tasks.map((item, index) => {
    return (
      <div className="item-wrapper" key={index}>
        <TaskItem
          setModalTask={() => {
            dispatch(modalActions.setModalTask(item));
          }}
          index={index}
          allTasksId={0}
          moveListItem={() => {}}
          task={item}
          onDrop={() => {}}
        />
      </div>
    );
  });

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="title-slogan">
            <div className="site-title">Roadmap</div>
            <div className="slogan">By Ivan Remezov</div>
          </div>
        </div>
        <div className="searched-terms">
          <div className="input-group mb-3">
            <SearchTerms />
            <label htmlFor="tasksPerPage" className="input-group-text">
              Tasks per page
            </label>
            <input
              type="number"
              className="form-control"
              id="tasksPerPage"
              value={pageLimit}
              onChange={(e) => {
                setPageLimit(parseInt(e.target.value));
              }}
            ></input>
          </div>
        </div>

        <nav aria-label="Page navigation example">{renderLinks()}</nav>

        <div className="searched-tasks-container">{taskItems}</div>
        {modalIsActive ? (
          <ShowTaskInModal show={modalIsActive} changeUrl={false} />
        ) : null}
      </div>
    </>
  );
};
