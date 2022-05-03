import React, { useEffect } from "react";
import HomeLayout from "Layout/Home/Home";
import Start from "./components/Start/Start";
import BestSellers from "./components/BestSellers/BestSellers";
import styles from "./styles/Dashboard.module.scss";
import Discounts from "./components/Discounts/Discounts";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import { useCartStore, useTrackStore } from "app/provider/Provider";

const Dashboard = () => {
  const { loadBestsellers } = useTrackStore();
  useEffect(() => {
    loadBestsellers();
  }, []);
  return (
    <HomeLayout>
      <div className={styles.container}>
        <Start />
        <BestSellers />
        <Discounts />
        <Newsletter />
        <Footer />
      </div>
    </HomeLayout>
  );
};

export default Dashboard;
