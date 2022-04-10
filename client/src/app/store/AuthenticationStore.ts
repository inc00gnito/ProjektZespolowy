import { IAuthModalType } from "app/model/authentication";
import { makeAutoObservable } from "mobx";
import React from "react";

export default class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);
  }

  isAuthenticated = true;
  authPopUp: IAuthModalType = null;
  authenticationPopup = "signin";

  authFunc = (callback: () => void) => {
    if (this.isAuthenticated) callback();
  };

  openPopUp = (type: IAuthModalType) => {
    this.authPopUp = type;
  };

  closePopUp = () => {
    this.authPopUp = null;
  };
}
