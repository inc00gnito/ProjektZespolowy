import { createContext, useContext } from "react";
import NewsletterStore from "../store/NewsletterStore";
import AuthenticationStore from "../store/AuthenticationStore";

interface IStore {
  newsletterStore: NewsletterStore;
  authenticationStore: AuthenticationStore;
}

export const stores: IStore = {
  newsletterStore: new NewsletterStore(),
  authenticationStore: new AuthenticationStore(),
};

export const Context = createContext(stores);

export const useStore = () => {
  const appContext = useContext(Context);
  return appContext;
};

export const useNewsletterStore = () => {
  const { newsletterStore } = useStore();
  return newsletterStore;
};

export const useAuthenticationStore = () => {
  const { authenticationStore } = useStore();
  return authenticationStore;
};
