import { useAuthenticationStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";
import React from "react";
import { RouteProps, Navigate, Outlet } from "react-router-dom";

const AuthRoute: React.FC<RouteProps> = () => {
  const { isAuthenticated } = useAuthenticationStore();
  console.log(isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
};

export default observer(AuthRoute);
