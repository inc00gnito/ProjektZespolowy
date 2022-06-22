import { IAuthResponse, ICreds, ISignup } from "app/model/authentication";
import { ICartItem } from "app/model/Cart";
import { IContactMessage } from "app/model/Contact";
import { ITrack } from "app/model/Track";
import { IOrder, IUser } from "app/model/User";
import { getToken } from "app/utils/Token";
import axios, { AxiosRequestConfig } from "axios";
import { request } from "http";

axios.defaults.baseURL = "https://trackslance.herokuapp.com/api/";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();
  config.headers = {
    Authorization: token,
  };
  return config;
});

const requests = {
  get: <T>(url: string) => axios.get<T>(url),
  post: <T>(url: string, body: any) => axios.post<T>(url, body),
  put: <T>(url: string, body: any) => axios.put<T>(url, body),
  delete: <T>(url: string) => axios.delete<T>(url),
  patch: <T>(url: string, body: any) => axios.patch<T>(url, body),
};

const Newsletter = {
  subscirbe: (email: string) => requests.post("newsletter", { email }),
};

const Track = {
  listBestsellers: () => requests.get<ITrack[]>("tracks/bestsellers"),
  list: (params: string) => requests.get<ITrack[]>(`tracks${params}`),
  add: (track: FormData) => requests.post("tracks", track),
};

const Authentication = {
  signup: (creds: ISignup) =>
    requests.post<IAuthResponse>("user/signup", {
      Username: creds.username,
      Email: creds.email,
      Password: creds.password,
    }),
  signin: (creds: ICreds) => requests.post<IAuthResponse>("user/login", creds),
  logout: () => requests.get("user/logout"),
};

const User = {
  details: () => requests.get<IUser>("user"),
  orderList: () => requests.get<IOrder[]>("order"),
  sendResetCode: (email: string) =>
    requests.post("user/sendResetCode", { email }),
  resetPassword: (code: string, newPassword: string) =>
    requests.post("user/resetPassword", { resetCode: code, newPassword }),
};

const Contact = {
  sendMessage: (message: IContactMessage) => requests.post("contact", message),
};

const Cart = {
  order: (order: ICartItem[]) => requests.post("order", order),
};

const Settings = {
  changeEmail: (email: string) => requests.put("user/changeEmail", { email }),
  changeName: (name: string) =>
    requests.put("user/changeName", { username: name }),
  changePassword: (currentPassword: string, newPassword: string) =>
    requests.put<string>("user/changePassword", {
      password: newPassword,
      oldPassword: currentPassword,
    }),
};

export default {
  Newsletter,
  Track,
  Authentication,
  User,
  Contact,
  Settings,
  Cart,
};
