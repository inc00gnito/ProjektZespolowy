import { autorun, makeAutoObservable, observe, reaction } from "mobx";
import trackImage1 from "assets/track1.webp";
import { ICartItem } from "app/model/Cart";
import { ITrack } from "app/model/Track";
import { stores } from "../provider/Provider";
import { checkAuth } from "app/utils/Auth";
import agent from "app/api/agent";

export default class CartStore {
  constructor() {
    makeAutoObservable(this);
    let cart: any = localStorage.getItem("cart");
    if (cart) {
      const cartList = JSON.parse(cart) as any;
      cartList.forEach((item: any) => {
        this.shoppingList.set(item.id, item);
      });
    }
  }
  shoppingList = new Map<number, ICartItem>();
  isPopup = false;

  closePopup = () => {
    this.isPopup = false;
  };

  openPopup = () => {
    this.isPopup = true;
  };

  addCartItem = checkAuth((track: ITrack) => {
    const cartItem = this.shoppingList.get(track.id);
    let newCartItem: ICartItem;
    if (cartItem) {
      return;
    }
    newCartItem = {
      ...JSON.parse(JSON.stringify(track)),
      quantity: 1,
    };
    this.shoppingList.set(newCartItem.id, newCartItem);

    this.openPopup();

    localStorage.setItem(
      "cart",
      JSON.stringify(Array.from(this.shoppingList.values()))
    );
  });

  cartItemDelete = (id: number) => {
    this.shoppingList.delete(id);
  };

  buy = async () => {
    const items = Array.from(this.shoppingList.values());
    try {
      await agent.Cart.order(items);
      this.shoppingList = new Map();
      localStorage.removeItem("cart");
    } catch (err) {
      console.log("order error");
      console.log(err);
    }
  };
}
