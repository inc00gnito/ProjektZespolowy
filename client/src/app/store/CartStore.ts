import { makeAutoObservable } from "mobx";
import trackImage1 from "assets/track1.webp";
import { ICartItemDetails } from "app/model/Cart";

export default class CartStore {
  constructor() {
    makeAutoObservable(this);
    this.initalize();
  }
  shoppingList = new Map<string, ICartItemDetails>();
  initalize = () => {
    this.shoppingList.set("1", {
      id: "1",
      image: trackImage1,
      name: "Lorem Ipsum",
      price: 10,
      quantity: 2,
    });

    this.shoppingList.set("2", {
      id: "2",
      image: trackImage1,
      name: "Lorem Ipsum121",
      price: 40,
      quantity: 1,
    });

    this.shoppingList.set("3", {
      id: "3",
      image: trackImage1,
      name: "Lorem Ipsum121dsa",
      price: 10,
      quantity: 5,
    });
  };

  cartItemIncreaseQuantity = (id: string) => {
    const item = this.shoppingList.get(id);
    if (!item) throw new Error("itme not found");

    item.quantity++;
    this.shoppingList.set(id, item);
  };

  cartItemDecreaseQuantity = (id: string) => {
    const item = this.shoppingList.get(id);
    if (!item) throw new Error("itme not found");
    if (item.quantity === 1) throw new Error("Can't decrease quantity");
    item.quantity--;
    this.shoppingList.set(id, item);
  };

  cartItemDelete = (id: string) => {
    this.shoppingList.delete(id);
  };
}
