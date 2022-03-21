import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useNewsletterStore } from "app/provider/Provider";
import AppRoutes from "app/routes";
import AppProvider from "app/provider/AppProvider";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
