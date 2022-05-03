import React, { useState } from "react";
import styles from "./OrderList.module.scss";
import OrderlistItem from "./OrderlistItem";

const OrderList = () => {
  const items = [
    {
      id: "1",
      date: new Date(),
    },
    {
      id: "2",
      date: new Date(),
    },
  ];

  const [activeItem, setActiveItem] = useState<string | null>(null);
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
          {items.map((item) => {
            return (
              <OrderlistItem
                item={item}
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

export default OrderList;
