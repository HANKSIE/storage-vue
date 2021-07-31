import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const http: AxiosInstance = axios.create();

http.defaults.baseURL = `${process.env.VUE_APP_URL}/api/`;
http.defaults.withCredentials = true;

http.interceptors.request.use((config: AxiosRequestConfig) => {

  const token = localStorage.getItem('token');

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
    if (err.response?.status == 401) {
      //logout handle
    }
    if(err.response?.status == 403){
      //forbidden handle
    }
    return Promise.reject(err);
  }
);

export default http;
