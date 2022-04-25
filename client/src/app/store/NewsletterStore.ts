import agent from "app/api/agent";
import { makeAutoObservable } from "mobx";
import { stores } from "../provider/Provider";
import axios from "axios";

export default class NewslettersStore {
  constructor() {
    makeAutoObservable(this);
  }

  // subscribeNewsletter() {
  //   stores.authenticationStore.authFunc(() => {
  //     console.log("logic goes here");
  //   });
  // }

  async subscribeNewsletter(email: string) {
    try {
      await agent.Newsletter.subscirbe(email);
    } catch (error) {
      if (!axios.isAxiosError(error))
        throw new Error("Server error, please try again later");
      const statusCode = error.response?.status;
      if (statusCode === 409) throw new Error("You have already subscribed");
      throw new Error("Server error, please try again later");
    }
  }
}
