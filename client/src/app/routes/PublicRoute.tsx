import { useAuthenticationStore } from "app/provider/Provider";
import React from "react";
import { RouteProps, Navigate, Outlet } from "react-router-dom";

const PublicRoute: React.FC<RouteProps> = () => {
  // const { isAuthenticated } = useAuthenticationStore();
  // if (isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
};

export default PublicRoute;
