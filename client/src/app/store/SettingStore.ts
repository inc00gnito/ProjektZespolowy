import agent from "app/api/agent";
import { makeAutoObservable, runInAction } from "mobx";
import { stores } from "app/provider/Provider";
import axios from "axios";
import { saveToken } from "app/utils/Token";

export default class SettingStore {
  constructor() {
    makeAutoObservable(this);
  }
  isSubmitting = false;

  updateEmail = async (email: string) => {
    this.isSubmitting = true;
    try {
      await agent.Settings.changeEmail(email);
      runInAction(() => {
        this.isSubmitting = false;
        if (stores.authenticationStore.user)
          stores.authenticationStore.user = {
            ...stores.authenticationStore.user,
            email,
          };
      });
    } catch (err) {
      runInAction(() => {
        this.isSubmitting = false;
      });
      if (!axios.isAxiosError(err)) return;
      const status = err.response?.status;
      const message = err.response?.data;
      if (status === 409 && message === "Email already exists")
        throw new Error("Email already exists");
    }
  };

  updateUsername = async (username: string) => {
    this.isSubmitting = true;
    try {
      await agent.Settings.changeName(username);
      runInAction(() => {
        this.isSubmitting = false;
        if (stores.authenticationStore.user)
          stores.authenticationStore.user = {
            ...stores.authenticationStore.user,
            username,
          };
      });
    } catch (err) {
      runInAction(() => {
        this.isSubmitting = false;
      });
      if (!axios.isAxiosError(err)) return;
      const status = err.response?.status;
      const message = err.response?.data;

      if (status === 409 && message === "Username already exists")
        throw new Error("Username already exists");
    }
  };

  updatePassword = async (currentPassword: string, newPassword: string) => {
    this.isSubmitting = true;
    try {
      const { data: token } = await agent.Settings.changePassword(
        currentPassword,
        newPassword
      );
      runInAction(() => {
        this.isSubmitting = false;
        saveToken(token);
      });
    } catch (err) {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  };
}
