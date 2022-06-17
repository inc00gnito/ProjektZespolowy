import React from "react";
import styles from "./PaymentSuccess.module.scss";

const PaymentSuccess = () => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>
        Payment accepted, you will be redirected to home page in a moment
      </p>
    </div>
  );
};

export default PaymentSuccess;
