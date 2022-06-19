import { useAuthenticationStore } from "app/provider/Provider";
import { observer } from "mobx-react-lite";
import React from "react";
import { RouteProps, Navigate, Outlet } from "react-router-dom";
import HomeLayout from "Layout/Home/Home";

const AuthRoute: React.FC<RouteProps> = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStore();
  if (isLoading)
    return (
      <HomeLayout>
        <div style={{ flex: 1 }}>
          <p>Loading...</p>
        </div>
      </HomeLayout>
    );
  else if (!isAuthenticated) return <Navigate to="/" />;
  return <Outlet />;
};

export default observer(AuthRoute);
