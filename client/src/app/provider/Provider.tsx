import { createContext, useContext } from "react";
import NewsletterStore from "../store/NewsletterStore";
import AuthenticationStore from "../store/AuthenticationStore";
import CartStore from "app/store/CartStore";
import TrackStore from "app/store/TrackStore";

interface IStore {
  newsletterStore: NewsletterStore;
  authenticationStore: AuthenticationStore;
  cartStore: CartStore;
  trackStore: TrackStore;
}

export const stores: IStore = {
  newsletterStore: new NewsletterStore(),
  authenticationStore: new AuthenticationStore(),
  cartStore: new CartStore(),
  trackStore: new TrackStore(),
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

export const useTrackStore = () => {
  const { trackStore } = useStore();
  return trackStore;
};
