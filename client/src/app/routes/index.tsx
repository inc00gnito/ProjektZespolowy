import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "features/Dashboard";
import Contact from "features/Contact";
import AuthRoute from "./AuthRoute";
import PublicRoute from "./PublicRoute";
import About from "features/About";
import Tracks from "features/Tracks";
import { useAuthenticationStore } from "app/provider/Provider";
import Signin from "features/Auth/Signin/Signin";
import { IAuthModalType } from "app/model/authentication";
import { observer } from "mobx-react-lite";
import Signup from "features/Auth/signup/Signup";
import ResetPassword from "features/Auth/ResetPassword/ResetPassword";
import Cart from "features/Cart/Cart";
import Payment from "features/Payment/Payment";
import Upload from "features/Upload/Upload";
import History from "features/History/History";

const AppRoutes = () => {
  const popUpComponent = (type: IAuthModalType) => {
    switch (type) {
      case "signin":
        return <Signin />;
      case "signup":
        return <Signup />;
      case "resetPassword":
        return <ResetPassword />;
      default:
        return <></>;
    }
  };
  const { authPopUp } = useAuthenticationStore();
  return (
    <BrowserRouter>
      <Routes>
        {authPopUp ? (
          <Route path="/*" element={popUpComponent(authPopUp)} />
        ) : null}
      </Routes>

      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/orders" element={<History />} />
        </Route>
        <Route path="/" element={<PublicRoute />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default observer(AppRoutes);
