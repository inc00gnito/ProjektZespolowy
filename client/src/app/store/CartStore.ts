import { makeAutoObservable, observe } from "mobx";
import trackImage1 from "assets/track1.webp";
import { ICartItem } from "app/model/Cart";
import { ITrack } from "app/model/Track";
import { stores } from "../provider/Provider";
import { checkAuth } from "app/utils/Auth";

export default class CartStore {
  constructor() {
    makeAutoObservable(this);
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
      newCartItem = cartItem;
      newCartItem.quantity++;
      this.shoppingList.set(newCartItem.id, newCartItem);
    } else {
      newCartItem = {
        ...JSON.parse(JSON.stringify(track)),
        quantity: 1,
      };
      console.log(newCartItem);
    }
    this.shoppingList.set(newCartItem.id, newCartItem);

    this.openPopup();
  });

  cartItemIncreaseQuantity = (id: number) => {
    const item = this.shoppingList.get(id);
    if (!item) throw new Error("itme not found");

    item.quantity++;
    this.shoppingList.set(id, item);
  };

  cartItemDecreaseQuantity = (id: number) => {
    const item = this.shoppingList.get(id);
    if (!item) throw new Error("itme not found");
    if (item.quantity === 1) throw new Error("Can't decrease quantity");
    item.quantity--;
    this.shoppingList.set(id, item);
  };

  cartItemDelete = (id: number) => {
    this.shoppingList.delete(id);
  };
}
