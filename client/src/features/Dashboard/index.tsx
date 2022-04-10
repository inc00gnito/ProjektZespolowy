import React from "react";
import HomeLayout from "Layout/Home/Home";
import Start from "./components/Start/Start";
import BestSellers from "./components/BestSellers/BestSellers";
import styles from "./styles/Dashboard.module.scss";
import Discounts from "./components/Discounts/Discounts";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";

const Dashboard = () => {
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
