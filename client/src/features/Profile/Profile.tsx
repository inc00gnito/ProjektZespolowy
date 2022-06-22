import React from "react";
import styles from "./Profile.module.scss";
import HomeLayout from "Layout/Home/Home";
import Header from "./components/Header/Header";
import OrderList from "./components/Order/OrderList";

const Orders = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.profile}>
          <Header />
        </div>
        <div className={styles.content}>
          <OrderList />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Orders;
