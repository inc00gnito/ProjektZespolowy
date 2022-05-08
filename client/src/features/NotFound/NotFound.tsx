import React from "react";
import HomeLayout from "Layout/Home/Home";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <p className={styles.text}>This page doesn't exist</p>
      </div>
    </HomeLayout>
  );
};

export default NotFound;
