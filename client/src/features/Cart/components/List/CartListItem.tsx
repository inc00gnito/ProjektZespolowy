import { ICartItem } from "app/model/Cart";
import { useCartStore } from "app/provider/Provider";
import React from "react";
import styles from "./CartListItem.module.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

interface IProps {
  cartItem: ICartItem;
}

const CartListItem: React.FC<IProps> = ({ cartItem }) => {
  const { cartItemDecreaseQuantity, cartItemIncreaseQuantity, cartItemDelete } =
    useCartStore();
  return (
    <li className={styles.item}>
      <div className={styles.track}>
        <div className={styles.image}>
          <img src={cartItem.imgFile} alt="track" className={styles.img} />
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.info}>
          <span className={styles.name}>{cartItem.title}</span>
          <span className={styles.price}>{cartItem.cost}.00$</span>
        </div>
        <div className={styles.gap} />
        <div className={styles.summary}>
          <div className={styles.amount}>
            <button
              className={styles.button}
              onClick={() => cartItemDecreaseQuantity(cartItem.id)}
            >
              <AiOutlineMinus />
            </button>
            <span className={styles.text}>{cartItem.quantity}</span>
            <button
              className={styles.button}
              onClick={() => cartItemIncreaseQuantity(cartItem.id)}
            >
              <AiOutlinePlus />
            </button>
          </div>
          <div className={styles.price}>
            <span className={styles.text}>
              {cartItem.quantity * cartItem.cost}.00$
            </span>
          </div>
          <div className={styles.delete}>
            <button
              className={styles.button}
              onClick={() => cartItemDelete(cartItem.id)}
            >
              <IoCloseOutline />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartListItem;
