import React from "react";
import styles from "./Upload.module.scss";
import HomeLayout from "Layout/Home/Home";
import Header from "./Components/Header/Header";
import Form from "./Components/Form/Form";

const Upload = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <Header />
          <Form />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Upload;
