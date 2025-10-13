import axios from "axios";
import type { UserAuth } from "../contexts/authContext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

type RestResponse = {
  statusCode: number,
  result: boolean,
  data: any,
  message: string,
  errorMessage: string | string[] | object | object[] | any
}

const api = axios.create({
  baseURL: SERVER_URL
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    return error.response;
  }
);

api.interceptors.request.use((config) => {
  const authSession = sessionStorage.getItem("CURRENT_USER");
  if (authSession) {
    const auth: UserAuth = JSON.parse(authSession);
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
  }
  return config;
});

api.defaults.withCredentials = true;

export { api };
export type { RestResponse };