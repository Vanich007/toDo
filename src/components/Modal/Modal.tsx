//npm install react-bootstrap@next bootstrap@5.1.1
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { TaskType } from "../../reducers/tasksReducer";

export function ShowTaskInModal(props: TaskType) {
  console.log(props);
  const [show, setShow] = useState(true);

  const handleSaveClose = () => {
    setShow(false);
    console.log("cancel");
  };
  const handleCancelClose = () => {
    setShow(false);
    console.log("save");
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleCancelClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.taskName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
