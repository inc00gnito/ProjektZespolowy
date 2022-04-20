import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.title}>
      <h1 className={styles.text}>UPLOAD YOUR TRACK</h1>
    </div>
  );
};

export default Header;
