import React, { FC } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { actions } from "../reducers/tasksReducer";
import { getError } from "../selectors/taskSelectors";
import styles from "./Layout.module.scss";
const Layoute: FC<React.ReactNode> = ({ children }) => {
  let error = useSelector(getError);
  const dispatch = useDispatch();
  const clearError = () => {
    dispatch(actions.clearError());
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.gradient} />
        {error && (
          <Alert variant="danger" onClose={clearError} dismissible>
            <Alert.Heading>Error occured!</Alert.Heading>
            {error}
          </Alert>
        )}
        <div className="header">
          <div>
            <Link to="/">
              <div className={styles.sitetitle}>Roadmap</div>
            </Link>
            <div className={styles.slogan}>By Ivan Remezov</div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Layoute;
