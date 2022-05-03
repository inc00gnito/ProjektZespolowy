import React from "react";
import styles from "./BestSellers.module.scss";
import Carousel from "./components/Carousel/Carousel";
import track1 from "assets/track1.webp";
import track2 from "assets/track2.webp";
import track3 from "assets/track3.webp";
import track4 from "assets/track4.webp";
import track5 from "assets/track5.webp";
import { useCartStore, useTrackStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";

const BestSellers = () => {
  const { tracksBestsellers } = useTrackStore();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>BEST SELLERS</h1>
          <button className={styles.button}>View All</button>
        </div>
        {tracksBestsellers.length && (
          <Carousel items={tracksBestsellers} mobileView={1} desktopView={4} />
        )}
      </div>
    </div>
  );
};

export default observer(BestSellers);
