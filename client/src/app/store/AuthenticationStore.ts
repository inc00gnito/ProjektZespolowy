import agent from "app/api/agent";
import { IAuthModalType, ICreds, ISignup } from "app/model/authentication";
import { makeAutoObservable, runInAction } from "mobx";
import React from "react";
import axios, { AxiosError } from "axios";
import { IUser } from "app/model/User";
import { getToken, removeToken, saveToken } from "app/utils/Token";

export default class AuthenticationStore {
  constructor() {
    makeAutoObservable(this);
    this.verifyUser();
  }

  isAuthenticated = false;
  authPopUp: IAuthModalType = null;
  user: IUser | null = null;
  isLoading = true;
  isSubmitting = false;
  resetToken: string | null = null;

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
      if (!getToken()) throw new Error("unauthenticated");
      const { data } = await agent.User.details();
      this.user = data;
      this.isAuthenticated = true;
      this.isLoading = false;
    } catch (error) {
      this.isAuthenticated = false;
      this.isLoading = false;
      removeToken();
    }
  };

  signIn = async (creds: ICreds) => {
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
        return {
          error: {
            type: "login" as "login" | "password",
            message: "User doesn't exist",
          },
        };
      } else if (status === 400 && response === "invalid password") {
        return {
          error: {
            type: "password" as "login" | "password",
            message: "Password is invalid",
          },
        };
      }
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
      if (!axios.isAxiosError(err)) return;
      const status = err.response?.status;
      const response = err.response?.data;
      if (status === 409 && response === "Username already exists") {
        return {
          error: {
            type: "username" as "email" | "password" | "username",
            message: "User already exists",
          },
        };
      } else if (status === 409 && response === "Email already exists") {
        return {
          error: {
            type: "email" as "email" | "password" | "username",
            message: "User already exists",
          },
        };
      }
    }
  };

  sendResetCode = async (email: string) => {
    this.isSubmitting = true;
    try {
      const { data } = await agent.User.sendResetCode(email);
      this.resetToken = data;
      runInAction(() => {
        this.isSubmitting = false;
      });
    } catch (err) {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  };

  resetPassword = async (code: string, newPassword: string) => {
    this.isSubmitting = true;
    try {
      await agent.User.resetPassword(code, newPassword, this.resetToken || "");
      runInAction(() => {
        this.isSubmitting = false;
      });
    } catch (err) {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  };

  logout = async () => {
    removeToken();
    this.user = null;
    this.isAuthenticated = false;
    try {
      await agent.Authentication.logout();
    } catch (err) {}
  };
}
