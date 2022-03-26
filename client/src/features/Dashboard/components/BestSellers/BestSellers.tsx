import React from "react";
import styles from "./BestSellers.module.scss";
import Carousel from "./components/Carousel/Carousel";
import track1 from "assets/track1.webp";
import track2 from "assets/track2.webp";
import track3 from "assets/track3.webp";
import track4 from "assets/track4.webp";
import track5 from "assets/track5.webp";

const BestSellers = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>BEST SELLERS</h1>
          <button className={styles.button}>View All</button>
        </div>

        <Carousel
          photos={[
            { id: 1, photo: track1 },
            { id: 2, photo: track2 },
            { id: 3, photo: track3 },
            { id: 4, photo: track4 },
            { id: 5, photo: track5 },
          ]}
          mobileView={1}
          desktopView={4}
        />
      </div>
    </div>
  );
};

export default BestSellers;
