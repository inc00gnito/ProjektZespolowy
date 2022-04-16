import { createContext, useContext } from "react";
import NewsletterStore from "../store/NewsletterStore";
import AuthenticationStore from "../store/AuthenticationStore";
import CartStore from "app/store/CartStore";

interface IStore {
  newsletterStore: NewsletterStore;
  authenticationStore: AuthenticationStore;
  cartStore: CartStore;
}

export const stores: IStore = {
  newsletterStore: new NewsletterStore(),
  authenticationStore: new AuthenticationStore(),
  cartStore: new CartStore(),
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

export const useCartStore = () => {
  const { cartStore } = useStore();
  return cartStore;
};
