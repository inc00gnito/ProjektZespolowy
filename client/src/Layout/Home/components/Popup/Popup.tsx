import React, { useEffect } from "react";
import styles from "./Popup.module.scss";
import track1 from "assets/track1.webp";
import { IoIosArrowForward } from "react-icons/io";
import { useCartStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";
import { Genre } from "app/model/Track";
import { useNavigate } from "react-router-dom";

const Popup = () => {
  const navigate = useNavigate();
  const { closePopup, shoppingList } = useCartStore();

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      closePopup();
    }, 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const itemCount = Array.from(shoppingList.values()).reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );

  const handleCheckoutProceed = () => {
    navigate("/cart");
    closePopup();
  };

  return (
    <div className={styles.popup}>
      <span className={styles.title}>YOUR CART ({itemCount}):</span>
      <div className={styles.trackList}>
        {Array.from(shoppingList.values()).map((track) => {
          return (
            <div className={styles.track}>
              <div className={styles.photo}>
                <img src={track.imgFile} alt="track" className={styles.img} />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>
                  <span className={styles.text}>{track.title}</span>
                  <span className={styles.subText}>{track.genre}</span>
                </div>
              </div>
              <div className={styles.price}>
                <span className={styles.text}>
                  ${track.cost * track.quantity}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button className={styles.checkoutButton} onClick={handleCheckoutProceed}>
        PROCEED TO CHECKOUT <IoIosArrowForward className={styles.icon} />
      </button>
      <button className={styles.continueButton} onClick={closePopup}>
        CONTINUE SHOPPING
      </button>
    </div>
  );
};

export default observer(Popup);
