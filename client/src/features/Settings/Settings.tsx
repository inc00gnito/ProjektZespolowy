import React from "react";
import AccountForm from "./AccountForm/AccountForm";
import SecurityForm from "./SecurityForm/SecurityForm";
import styles from "./Settings.module.scss";
import HomeLayout from "Layout/Home/Home";

const Settings = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <AccountForm />
          </div>
          <div>
            <SecurityForm />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Settings;
