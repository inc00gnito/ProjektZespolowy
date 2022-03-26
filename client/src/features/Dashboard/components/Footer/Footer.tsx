import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.colorBlock}></div>
        <div className={styles.line}></div>
      </div>
    </footer>
  );
};

export default Footer;
