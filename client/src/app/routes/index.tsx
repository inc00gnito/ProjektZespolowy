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

const AppRoutes = () => {
  const { authenticationPopup } = useAuthenticationStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
      </Routes>

      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracks" element={<Tracks />} />
        </Route>
        <Route path="/" element={<PublicRoute />}>
          {/* <Route path="/signin" element={<div>ds</div>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
