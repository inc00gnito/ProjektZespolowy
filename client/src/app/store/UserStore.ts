import agent from "app/api/agent";
import { ICartItem } from "app/model/Cart";
import { IOrder } from "app/model/User";
import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  orders: IOrder[] | null = null;

  loadOrders = async () => {
    try {
      const { data } = await agent.User.orderList();
      this.orders = data;
    } catch (err) {}
  };
}
