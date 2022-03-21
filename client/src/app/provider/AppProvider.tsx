import React from "react";
import { Context, stores } from "app/provider/Provider";

interface IProps {
  children: React.ReactNode[] | React.ReactNode;
}
const AppProvider: React.FC<IProps> = ({ children }) => {
  return <Context.Provider value={stores}>{children}</Context.Provider>;
};

export default AppProvider;
