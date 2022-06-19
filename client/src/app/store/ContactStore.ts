import agent from "app/api/agent";
import { IContactMessage } from "app/model/Contact";
import { makeAutoObservable, runInAction } from "mobx";

export default class ContactStore {
  constructor() {
    makeAutoObservable(this);
  }
  isSubmitting = false;

  sendMessage = async (message: IContactMessage) => {
    this.isSubmitting = true;
    try {
      await agent.Contact.sendMessage(message);
      runInAction(() => {
        this.isSubmitting = false;
      });
    } catch (err) {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  };
}
