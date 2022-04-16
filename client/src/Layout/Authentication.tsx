import React from "react";
import styles from "./styles/Authentication.module.scss";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}
const Authentication: React.FC<IProps> = ({ children }) => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Authentication;
