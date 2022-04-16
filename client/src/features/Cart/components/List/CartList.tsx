import { useCartStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";
import React from "react";
import styles from "./CartList.module.scss";
import CartListItem from "./CartListItem";

const CartList = () => {
  const { shoppingList } = useCartStore();
  return (
    <ul className={styles.list}>
      {Array.from(shoppingList.values()).map((cartItem) => (
        <CartListItem cartItem={cartItem} key={cartItem.id} />
      ))}
    </ul>
  );
};

export default observer(CartList);
