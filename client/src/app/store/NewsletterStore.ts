import { makeAutoObservable } from "mobx";

export default class NewslettersStore {
  constructor() {
    makeAutoObservable(this);
  }
  test() {}
}
