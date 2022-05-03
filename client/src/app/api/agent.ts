import { ISignup } from "app/model/authentication";
import { ITrack } from "app/model/Track";
import axios from "axios";
import { request } from "http";

axios.defaults.baseURL = "https://trackslance.azurewebsites.net/api/";
axios.defaults.withCredentials = true;

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
    requests.post("user/signup", {
      Username: creds.username,
      Email: creds.email,
      Password: creds.password,
    }),
};

export default { Newsletter, Track, Authentication };
