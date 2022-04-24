import React from "react";
import styles from "./Header.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.info}>
          <div className={styles.picture}>A</div>
          <div className={styles.name}>Aleksandra Janusz</div>
        </div>
        <div className={styles.menu}>
          <BsThreeDotsVertical className={styles.icon} />
        </div>
      </div>
      <div className={styles.tabs}></div>
    </div>
  );
};

export default Header;
