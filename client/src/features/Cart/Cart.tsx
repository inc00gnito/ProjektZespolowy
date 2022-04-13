import React from "react";
import styles from "./Cart.module.scss";
import HomeLayout from "Layout/Home/Home";
import trackImage1 from "assets/track1.webp";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

const Cart = () => {
  const list = [
    {
      id: 1,
      image: trackImage1,
      name: "Lorem Ipsum",
      price: 10,
      quantity: 2,
    },
  ];
  return (
    <HomeLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.cart}>
            <div className={styles.title}>
              <h1 className={styles.text}>Cart Review</h1>
            </div>
            <ul className={styles.list}>
              <li className={styles.item}>
                <div className={styles.track}>
                  <div className={styles.image}>
                    <img src={trackImage1} alt="track" className={styles.img} />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.name}>Lorem Ipsum</span>
                    <span className={styles.price}>10,00 $</span>
                  </div>
                </div>
                <div className={styles.summary}>
                  <div className={styles.amount}>
                    <button className={styles.button}>
                      <AiOutlineMinus />
                    </button>
                    <span className={styles.text}>2</span>
                    <button className={styles.button}>
                      <AiOutlinePlus />
                    </button>
                  </div>
                  <div className={styles.price}>
                    <span className={styles.text}>20,00$</span>
                  </div>
                  <div className={styles.delete}>
                    <button className={styles.button}>
                      <IoCloseOutline />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
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
        </div>
      </div>
    </HomeLayout>
  );
};

export default Cart;
