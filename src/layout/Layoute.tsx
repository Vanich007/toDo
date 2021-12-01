import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Layout.module.scss";
const Layoute: FC<React.ReactNode> = ({ children }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.gradient} />
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
