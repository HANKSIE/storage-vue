import http from "@/utils/http";
import { LoginResponse } from "@/type/response/auth"
import { AxiosResponse } from "axios";
import User from "@/type/user";

const api = {
    loadUser(): Promise<AxiosResponse<User>> {
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
