import { makeAutoObservable } from "mobx";
import { stores } from "../provider/Provider";

export default class NewslettersStore {
  constructor() {
    makeAutoObservable(this);
  }

  subscribeNewsletter() {
    stores.authenticationStore.authFunc(() => {
      console.log("logic goes here");
    });
  }
}
