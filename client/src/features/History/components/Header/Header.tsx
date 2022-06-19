import React from "react";
import styles from "./Header.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import Select from "./Select/Select";
import Tabs from "./Tabs/Tabs";
import { observer } from "mobx-react-lite";
import { useAuthenticationStore } from "app/provider/Provider";

const Header = () => {
  const { user } = useAuthenticationStore();
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.info}>
          <div className={styles.picture}>
            {user?.username.slice(0, 1).toUpperCase()}
          </div>
          <div className={styles.name}>{user?.username}</div>
        </div>
        <div className={styles.menu}>
          <BsThreeDotsVertical className={styles.icon} />
        </div>
      </div>
      <div className={styles.tabs}>
        <div className={styles.select}>
          <Select />
        </div>
        <div className={styles.nav}>
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default observer(Header);
