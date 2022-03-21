import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "features/Dashboard";
import Contact from "features/Contact";
import AuthRoute from "./AuthRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/signin" element={<div>ds</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
