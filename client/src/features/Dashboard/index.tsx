import React from "react";
import HomeLayout from "Layout/Home";
import Start from "./components/Start/Start";
import BestSellers from "./components/BestSellers/BestSellers";

const Dashboard = () => {
  return (
    <HomeLayout>
      <Start />
      <BestSellers />
    </HomeLayout>
  );
};

export default Dashboard;
