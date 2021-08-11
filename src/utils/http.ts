import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useStore } from "@/store";
import apiToken from "./token/apiToken";

const http: AxiosInstance = axios.create();

http.defaults.baseURL = `${process.env.VUE_APP_URL}/api/`;
http.defaults.withCredentials = true;

http.interceptors.request.use((config: AxiosRequestConfig) => {

  const token = apiToken.value;

  if (token) {
     config.headers['Authorization'] = token;
  }

  return config;
}, (err): Promise<never> => {
  // Do something with request error
  return Promise.reject(err);
});

http.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    return res;
  },
  (err: AxiosError) :Promise<never> => {
    const statusCode = err.response?.status;
    if (statusCode == 401 || statusCode == 403) {
      const { auth } = useStore();
      auth.removeUser();
      apiToken.remove();
    }
    return Promise.reject(err);
  }
);

export default http;
