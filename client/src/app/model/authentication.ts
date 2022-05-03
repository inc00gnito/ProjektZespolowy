export type IAuthModalType = "signin" | "signup" | "resetPassword" | null;

export interface ICreds {
  login: string;
  password: string;
}

export interface ISignup {
  username: string;
  email: string;
  password: string;
}
