import { stores } from "app/provider/Provider";
export const checkAuth = (callback: (args: any) => any) => {
  return (...args: any) => {
    if (stores.authenticationStore.authFunc()) callback(args);
  };
};
