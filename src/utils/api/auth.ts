import http from "@/utils/http";
import { LoadUserResponse, LoginResponse } from "@/type/response/auth"
import { AxiosResponse } from "axios";

const api = {
  loadUser(): Promise<AxiosResponse<LoadUserResponse>> {
    return http.get("user");
  },

  login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
    return http.post('login', { email, password });
  },

  logout(): Promise<AxiosResponse<void>> {
    return http.get('logout');
  },

  register(formData: FormData): Promise<AxiosResponse<void>> {
    return http.post('register', formData);
  }
};

export default api;
