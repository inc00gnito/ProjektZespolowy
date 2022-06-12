import { useCartStore } from "app/provider/Provider";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CartSummary.module.scss";

const CartSummary = () => {
  const navigate = useNavigate();
  const { shoppingList } = useCartStore();

  const tracksPrice = Array.from(shoppingList.values()).reduce(
    (prev, curr) => prev + curr.quantity * curr.cost,
    0
  );
  const discount = 0;

  const handlePayButton = () => {
    navigate("/payment");
  };
  return (
    <div className={styles.summary}>
      <div className={styles.calculations}>
        <div className={styles.item}>
          <span className={styles.text}>Price</span>
          <span className={styles.number}>{tracksPrice} $</span>
        </div>
        <div className={styles.item}>
          <span className={styles.text}>Discount</span>
          <span className={styles.number}>-${discount} $</span>
        </div>
      </div>
      <div className={styles.total}>
        <span className={styles.text}>Total</span>
        <span className={styles.number}>{tracksPrice - discount}$</span>
      </div>
      <button className={styles.submitButton} onClick={handlePayButton}>
        Submit your order
      </button>
      <p className={styles.agreement}>
        By clicking the button you accept the <br /> product(s) License
        Agreement(s)
      </p>
    </div>
  );
};

export default CartSummary;
