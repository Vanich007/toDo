import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { actions } from "../../reducers/tasksReducer";
import { actions as modlaActions } from "../../reducers/modalReducer";
import {
  getActiveTask,
  getTemporaryTask,
  getModalIsActive,
} from "../../selectors/taskSelectors";
import { useDispatch, useSelector } from "react-redux";
import { EditTask } from "../Tasks/EditTask";
import { useHistory } from "react-router-dom";

export function ShowTaskInModal(props: any) {
  const activeTask = useSelector(getActiveTask);
  const modalIsActive = useSelector(getModalIsActive);
  const history = useHistory();

  useEffect(() => {
    history.push({
      pathname: "/task/",
      search: `?task=${activeTask.id}`,
    });
  }, [activeTask.id]);

  const temporaryTask = useSelector(getTemporaryTask);

  const dispatch = useDispatch();

  const handleSaveClose = () => {
    dispatch(actions.onTaskChange(temporaryTask));
    dispatch(modlaActions.turnOffModal());
    history.push({ pathname: "/" });
  };
  const handleCancelClose = () => {
    dispatch(modlaActions.turnOffModal());
    history.push({ pathname: "/" });
  };
  const deleteTaskItem = () => {
    dispatch(actions.onTaskDelete(activeTask.id));
    dispatch(modlaActions.turnOffModal());
    history.push({ pathname: "/" });
  };

  return (
    <>
      <Modal show={modalIsActive} onHide={handleCancelClose}>
        <Modal.Header closeButton>
          <Modal.Title>{activeTask.taskName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTask
            taskName={activeTask.taskName}
            status={activeTask.status}
            deadline={activeTask.deadline}
            id={activeTask.id}
            show={props.show}
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
}
