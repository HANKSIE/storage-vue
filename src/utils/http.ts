import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import apiToken from "./token/apiToken";
import clearAuthAndRedirectToLogin from "./action/clearAuthAndRedirectToLogin";

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
    if (statusCode == 401) {
      clearAuthAndRedirectToLogin();
    }
    return Promise.reject(err);
  }
);

export default http;
