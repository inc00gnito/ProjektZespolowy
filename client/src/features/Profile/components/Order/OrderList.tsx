import { useUserStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styles from "./OrderList.module.scss";
import OrderlistItem from "./OrderlistItem";

const OrderList = () => {
  const { orders, loadOrders } = useUserStore();

  useEffect(() => {
    loadOrders();
  }, []);
  console.log(orders);

  const [activeItem, setActiveItem] = useState<number | null>(null);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My orders</h2>
        <span className={styles.text}>View your order history</span>
      </div>
      <div className={styles.table}>
        <div className={styles.name}>
          <div className={styles.column}>
            <span>Date</span>
          </div>
          <div className={styles.column}>
            <span>Order</span>
          </div>
          <div className={styles.column}>
            <span>Status</span>
          </div>
          <div className={styles.column}>
            <span>Sum</span>
          </div>
        </div>
        <div className={styles.list}>
          {orders &&
            orders.map((order) => {
              return (
                <OrderlistItem
                  order={order}
                  setActive={setActiveItem}
                  active={activeItem}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default observer(OrderList);
