import React from "react";
import styles from "./Cart.module.scss";
import HomeLayout from "Layout/Home/Home";
import CartList from "./components/List/CartList";
import CartSummary from "./components/Summary/CartSummary";
import CartHeader from "./components/Header/CartHeader";

const Cart = () => {
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.cart}>
            <CartHeader />
            <CartList />
          </div>
          <div className={styles.summary}>
            <CartSummary />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Cart;
