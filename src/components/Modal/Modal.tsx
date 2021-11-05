import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FC, useEffect } from "react";

import { actions as modalActions } from "../../reducers/modalReducer";
import {
  getActiveTask,
  getTemporaryTask,
  getModalIsActive,
} from "../../selectors/taskSelectors";
import { useDispatch, useSelector } from "react-redux";
import { EditTask } from "../Tasks/EditTask";
import { useHistory } from "react-router-dom";
import { getIsNewTask } from "../../selectors/modalSelectors";
import { taskAPI } from "../../API/taskAPI";
type ShowTaskInModalPropsType = {
  show: boolean;
  changeUrl: boolean;
};
export const ShowTaskInModal: FC<ShowTaskInModalPropsType> = (props) => {
  const activeTask = useSelector(getActiveTask);
  const modalIsActive = useSelector(getModalIsActive);
  const history = useHistory();

  useEffect(() => {
    if (props.changeUrl) {
      history.push({
        pathname: "/task/",
        search: `?task=${activeTask.id}`,
      });
    }
  }, [activeTask.id, history, props.changeUrl]);

  const temporaryTask = useSelector(getTemporaryTask);

  const dispatch = useDispatch();

  const isNewTask = useSelector(getIsNewTask);

  const handleSaveClose = () => {
    if (isNewTask) {
      dispatch(modalActions.setIsNewTask(false));
      dispatch(taskAPI.createTask(temporaryTask));
    } else dispatch(taskAPI.patchTask(temporaryTask));

    dispatch(modalActions.turnOffModal());
    if (props.changeUrl) history.push({ pathname: "/" });
  };
  const handleCancelClose = () => {
    dispatch(modalActions.turnOffModal());
    if (props.changeUrl) history.push({ pathname: "/" });
  };

  const deleteTaskItem = () => {
    dispatch(taskAPI.deleteTask(activeTask.id));
    dispatch(modalActions.turnOffModal());
    if (props.changeUrl) history.push({ pathname: "/" });
  };

  return (
    <>
      <Modal show={modalIsActive} onHide={handleCancelClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {<div style={{ color: "black" }}>{activeTask.taskName}</div>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTask
            taskName={activeTask.taskName}
            status={activeTask.status}
            deadline={activeTask.deadline}
            order={activeTask.order}
            id={activeTask.id}
            show={props.show}
            description={activeTask.description}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveClose}>
            Save Changes
          </Button>
          <Button onClick={deleteTaskItem} variant="danger">
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCancelClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
