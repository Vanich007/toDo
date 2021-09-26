//npm install react-bootstrap@next bootstrap@5.1.1
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { actions, TaskType } from "../../reducers/tasksReducer";
import { getActiveTask, getTemporaryTask } from "../../selectors/taskSelectors";
import { AnyIfEmpty, useDispatch, useSelector } from "react-redux";
import { EditTask } from "../Tasks/EditTask";

export function ShowTaskInModal(props: any) {
  const activeTask = useSelector(getActiveTask);
  const temporaryTask = useSelector(getTemporaryTask);
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);

  const handleSaveClose = () => {
    dispatch(actions.onTaskChange(temporaryTask));
    setShow(false);
  };
  const handleCancelClose = () => {
    setShow(false);
  };
  // const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleCancelClose}>
        <Modal.Header closeButton>
          <Modal.Title>{activeTask.taskName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTask
            taskName={activeTask.taskName}
            status={activeTask.status}
            deadline={activeTask.deadline}
            id={activeTask.id}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
