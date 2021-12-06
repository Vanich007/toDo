import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FC, useEffect } from "react";
import { actions as modalActions } from "../../reducers/modalReducer";
import { getActiveTask, getModalIsActive } from "../../selectors/taskSelectors";
import { useDispatch, useSelector } from "react-redux";
import { EditTask } from "../Tasks/EditTask";
import { useNavigate } from "react-router";
import { getIsNewTask } from "../../selectors/modalSelectors";
import { taskAPI } from "../../API/taskAPI";
type ShowTaskInModalPropsType = {
  show: boolean;
  changeUrl: boolean;
};
export const ShowTaskInModal: FC<ShowTaskInModalPropsType> = (props) => {
  const activeTask = useSelector(getActiveTask);
  const modalIsActive = useSelector(getModalIsActive);

  let navigate = useNavigate();
  useEffect(() => {
    if (props.changeUrl) {
      navigate(`/task/?task=${activeTask.id}`);
    }
  }, [activeTask.id, navigate, props.changeUrl]);

  const dispatch = useDispatch();

  const handleCancelClose = () => {
    dispatch(modalActions.turnOffModal());
    // if (props.changeUrl) navigate("/");
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
      </Modal>
    </>
  );
};
