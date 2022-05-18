import { IAuthResponse, ICreds, ISignup } from "app/model/authentication";
import { ITrack } from "app/model/Track";
import { IUser } from "app/model/User";
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
  list: () => requests.get<ITrack[]>("tracks"),
  listFiltered: (filter: number) =>
    requests.get<ITrack[]>(`tracks/filterbygenerer?genre=${filter}`),
  listSortedBy: (sortBy: number) =>
    requests.get<ITrack[]>(`tracks/sort?key=${sortBy}`),
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
};

export default { Newsletter, Track, Authentication, User };
