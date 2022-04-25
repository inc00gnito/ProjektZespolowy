import axios from "axios";

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

export default { Newsletter };
