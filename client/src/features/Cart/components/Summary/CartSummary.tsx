import React from "react";
import styles from "./CartSummary.module.scss";

const CartSummary = () => {
  return (
    <div className={styles.summary}>
      <div className={styles.calculations}>
        <div className={styles.item}>
          <span className={styles.text}>Price</span>
          <span className={styles.number}>20 $</span>
        </div>
        <div className={styles.item}>
          <span className={styles.text}>Discount</span>
          <span className={styles.number}>-0 $</span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.text}>Total</span>
        <span className={styles.number}>20$</span>
      </div>
      <button className={styles.submitButton}>Submit your order</button>
      <p className={styles.agreement}>
        By clicking the button you accept the <br /> product(s) License
        Agreement(s)
      </p>
    </div>
  );
};

export default CartSummary;
