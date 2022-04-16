import React from "react";
import styles from "./CartHeader.module.scss";

const CartHeader = () => {
  return (
    <div className={styles.title}>
      <h1 className={styles.text}>Cart Review</h1>
    </div>
  );
};

export default CartHeader;
