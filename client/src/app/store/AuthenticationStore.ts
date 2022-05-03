import agent from "app/api/agent";
import { IAuthModalType, ISignup } from "app/model/authentication";
import { makeAutoObservable } from "mobx";
import React from "react";
import axios from "axios";

export default class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAuthenticated = true;
  authPopUp: IAuthModalType = null;

  authFunc = (callback: () => void) => {
    if (this.isAuthenticated) callback();
  };

  openPopUp = (type: IAuthModalType) => {
    this.authPopUp = type;
  };

  closePopUp = () => {
    this.authPopUp = null;
  };

  signIn = () => {};

  signUp = async (signinValues: ISignup) => {
    try {
      const res = await agent.Authentication.signup(signinValues);
      console.log(res);
    } catch (err) {
      if (axios.isAxiosError(err)) return console.log("fds");
      console.log("server error");
    }
  };
}
