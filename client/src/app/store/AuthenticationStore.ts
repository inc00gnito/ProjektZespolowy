import agent from "app/api/agent";
import { IAuthModalType, ICreds, ISignup } from "app/model/authentication";
import { makeAutoObservable, runInAction } from "mobx";
import React from "react";
import axios, { AxiosError } from "axios";
import { IUser } from "app/model/User";
import { removeToken, saveToken } from "app/utils/Token";

export default class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);

    this.verifyUser();
  }

  isAuthenticated = false;
  authPopUp: IAuthModalType = null;
  user: IUser | null = null;

  authFunc = () => {
    if (this.isAuthenticated) return true;
    this.openPopUp("signin");
    return false;
  };

  openPopUp = (type: IAuthModalType) => {
    this.authPopUp = type;
  };

  closePopUp = () => {
    this.authPopUp = null;
  };

  verifyUser = async () => {
    try {
      const { data } = await agent.User.details();
      this.user = data;
      this.isAuthenticated = true;
    } catch (error) {
      this.isAuthenticated = false;
    }
  };

  signIn = async (creds: ICreds) => {
    console.log("store?");
    try {
      const { data } = await agent.Authentication.signin(creds);
      const { user, token } = data;
      saveToken(token);
      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
        this.closePopUp();
      });
    } catch (err) {
      if (!axios.isAxiosError(err)) return;
      const status = err.response?.status;
      const response = err.response?.data;
      if (status === 404 && response === "user doesnt exist") {
        console.log("user doesn't exist");
        return {
          error: {
            type: "login" as "login" | "password",
            message: "User doesn't exist",
          },
        };
      }
      // throw new Error({ type: "login", text: "User doesn't exist" });
    }
  };

  signUp = async (signinValues: ISignup) => {
    try {
      const res = await agent.Authentication.signup(signinValues);
      const { user, token } = res.data;
      saveToken(token);
      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
        this.closePopUp();
      });
    } catch (err) {
      if (axios.isAxiosError(err)) return console.log("fds");
      console.log("server error");
    }
  };

  logout = async () => {
    try {
      await agent.Authentication.logout();
    } catch (err) {}
    removeToken();
    this.user = null;
    this.isAuthenticated = false;
  };
}
