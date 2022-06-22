import React from "react";
import styles from "./OrderListItem.module.scss";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Track1 from "assets/track1.webp";
import { ICartItem } from "app/model/Cart";
import { IOrder } from "app/model/User";

interface IProps {
  setActive: (id: number | null) => void;
  active: number | null;
  order: IOrder;
}

const OrderlistItem: React.FC<IProps> = ({ order, active, setActive }) => {
  const isActive = active === order.id;

  const onHandleDropdown = () => {
    if (isActive) return setActive(null);
    setActive(order.id);
  };
  const date = new Date(order.dateOfPurchase);
  console.log(order.dateOfPurchase);
  const day = date.getDate();
  const dayString = day < 10 ? "0" + day : day;
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? "0" + month : month;
  const year = date.getFullYear();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.column}>
          {dayString}.{monthString}.{year}
        </div>
        <div className={styles.column}>#{order.id}</div>
        <div className={styles.column}>Payment completed</div>
        <div className={styles.column}>{order.price} $</div>
        <div className={styles.column}>
          <button className={styles.button} onClick={onHandleDropdown}>
            {isActive ? (
              <BsChevronUp className={styles.icon} />
            ) : (
              <BsChevronDown className={styles.icon} />
            )}
          </button>
        </div>
      </div>
      {isActive ? (
        <div className={styles.details}>
          <div className={styles.summary}>
            <div className={styles.item}>
              <div className={styles.name}>
                <span className={styles.text}>Status:</span>
              </div>
              <div className={styles.value}>
                <span className={styles.text}>Confirmed</span>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.name}>
                <span className={styles.text}>Sum:</span>
              </div>
              <div className={styles.value}>
                <span className={styles.text}>{order.price} $</span>
              </div>
            </div>
          </div>
          <div className={styles.shoppingList}>
            {order.tracks.map((track) => (
              <div className={styles.item}>
                <div className={styles.photo}>
                  <img src={track.imgFile} alt="track" className={styles.img} />
                </div>
                <div className={styles.info}>
                  <span className={styles.name}>{track.title}</span>
                  <span className={styles.infoItem}>Price: {track.cost}$</span>
                </div>{" "}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderlistItem;
