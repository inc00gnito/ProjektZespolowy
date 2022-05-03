import React from "react";
import styles from "./OrderListItem.module.scss";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Track1 from "assets/track1.webp";

interface IProps {
  setActive: (id: string | null) => void;
  active: string | null;
  item: {
    id: string;
    date: Date;
  };
}

const OrderlistItem: React.FC<IProps> = ({ item, active, setActive }) => {
  const isActive = active === item.id;

  const onHandleDropdown = () => {
    if (isActive) return setActive(null);
    setActive(item.id);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.column}>26 Jan 2022</div>
        <div className={styles.column}>#10075</div>
        <div className={styles.column}>#10075</div>
        <div className={styles.column}>#10075</div>
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
                <span className={styles.text}>100,00 $</span>
              </div>
            </div>
          </div>
          <div className={styles.shoppingList}>
            <div className={styles.item}>
              <div className={styles.photo}>
                <img src={Track1} alt="track" className={styles.img} />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>Track name</span>
                <span className={styles.infoItem}>Price: 100.00$</span>
              </div>
              <div className={styles.price}>
                <span>100.00$ </span>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.photo}>
                <img src={Track1} alt="track" className={styles.img} />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>Track name</span>
                <span className={styles.infoItem}>Price: 100.00$</span>
              </div>
              <div className={styles.price}>
                <span>100.00$ </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderlistItem;
