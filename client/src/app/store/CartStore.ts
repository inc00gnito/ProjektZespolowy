import { makeAutoObservable, observe } from "mobx";
import trackImage1 from "assets/track1.webp";
import { ICartItem } from "app/model/Cart";
import { ITrack } from "app/model/Track";

export default class CartStore {
  constructor() {
    makeAutoObservable(this);
    this.initalize();
  }
  shoppingList = new Map<number, ICartItem>();
  isPopup = false;
  initalize = () => {
    this.shoppingList.set(1, {
      id: 1,
      imgFile: trackImage1,
      title: "Lorem Ipsum",
      cost: 10,
      quantity: 2,
      time: 10,
      genre: 0,
      discountedByShop: 0,
      discountedByUser: 0,
      isDiscounted: false,
      timesSold: 0,
      tags: [],
      authors: [],
      audioFile: "",
      demoFile: "",
    });

    this.shoppingList.set(2, {
      id: 2,
      imgFile: trackImage1,
      title: "Lorem Ipsum121",
      cost: 40,
      quantity: 1,
      time: 10,
      genre: 0,
      discountedByShop: 0,
      discountedByUser: 0,
      isDiscounted: false,
      timesSold: 0,
      tags: [],
      authors: [],
      audioFile: "",
      demoFile: "",
    });

    this.shoppingList.set(3, {
      id: 3,
      imgFile: trackImage1,
      title: "Lorem Ipsum121dsa",
      cost: 10,
      quantity: 5,
      time: 10,
      genre: 0,
      discountedByShop: 0,
      discountedByUser: 0,
      isDiscounted: false,
      timesSold: 0,
      tags: [],
      authors: [],
      audioFile: "",
      demoFile: "",
    });
  };

  closePopup = () => {
    this.isPopup = false;
  };

  openPopup = () => {
    this.isPopup = true;
  };

  addCartItem = (track: ITrack) => {
    const newCartItem: ICartItem = {
      ...track,
      quantity: 1,
    };
    this.shoppingList.set(newCartItem.id, newCartItem);

    this.openPopup();
  };

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
