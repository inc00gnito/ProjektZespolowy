import React from "react";
import styles from "./Tabs.module.scss";
const Tabs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item} data-active>
        <button className={styles.button} role="tab">
          My orders
        </button>
      </div>
      <div className={styles.item}>
        <button className={styles.button} role="tab">
          My subscriptions
        </button>
      </div>
    </div>
  );
};

export default Tabs;
