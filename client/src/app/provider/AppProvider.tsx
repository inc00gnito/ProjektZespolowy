import React from "react";
import { Context, stores, useAuthenticationStore } from "app/provider/Provider";
import Loading from "components/Loading/Loading";
import { observer } from "mobx-react-lite";

interface IProps {
  children: React.ReactNode[] | React.ReactNode;
}
const AppProvider: React.FC<IProps> = ({ children }) => {
  const { isLoading } = useAuthenticationStore();
  return (
    <Context.Provider value={stores}>
      {isLoading ? <Loading /> : children}
    </Context.Provider>
  );
};

export default observer(AppProvider);
