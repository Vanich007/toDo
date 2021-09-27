//npm install react-bootstrap@next bootstrap@5.1.1
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { actions, TaskType } from "../../reducers/tasksReducer";
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
  console.log("modalIsActive", modalIsActive);
  const history = useHistory();

  useEffect(() => {
    history.push({
      pathname: "/task/",
      search: `?task=${activeTask.id}`,
    });
  }, [activeTask.id]);

  const temporaryTask = useSelector(getTemporaryTask);
  //const isNewTask = useSelector(getIsNewTask);
  const dispatch = useDispatch();

  //const [show, setShow] = useState(props.show);

  const handleSaveClose = () => {
    dispatch(actions.onTaskChange(temporaryTask));
    // setShow(false);
    dispatch(modlaActions.turnOffModal());
  };
  const handleCancelClose = () => {
    dispatch(modlaActions.turnOffModal());
    //setShow(false);
    //if (isNewTask) dispatch(actions.deleteNewTask(activeTask));
  };
  const deleteTaskItem = () => {
    dispatch(actions.onTaskDelete(activeTask.id));
    dispatch(modlaActions.turnOffModal());
  };
  // const handleShow = () => setShow(true);

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
          <button
            type="button"
            onClick={deleteTaskItem}
            className="btn btn-danger"
          >
            Delete
          </button>
          <Button variant="secondary" onClick={handleCancelClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
