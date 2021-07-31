import http from "./http";
import fileConfig from "@/config/file";
import { LoginResponse } from "@/type/response/auth"
import { AxiosResponse } from "axios";
import User from "@/type/user";
import { ListResponse, MakeDirResponse } from "@/type/response/fileManager";

const api = {

  auth: {

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
  },

  fileManager: {
    ls(type: number, id: number, dir: string, only = fileConfig.ls.BOTH): Promise<AxiosResponse<ListResponse>> {
      return http.post(`${type}/${id}/files`,{
        dir,
        only,
      });
    },
    mkdir(type: number, id: number, dir: string, dirname: string): Promise<AxiosResponse<MakeDirResponse>>{
      return http.post(`${type}/${id}/files/mkdir`, {
        dir,
        dirname
      });
    },
    remove(type: number, id: number, dir: string, files: string[]) {
      return http.delete(`${type}/${id}/files/remove`, {
        data: {
          dir,
          file_list : files
        }
      });
    },
    move(type: number, id: number, from_dir: string, to_dir: string, files: string[], override_flag = fileConfig.cp_mv.OVERRIDE_NONE){
      return http.put(`${type}/${id}/files/move`, {
        from_dir,
        to_dir,
        file_list: files,
        override_flag
      });
    },
    copy(type: number, id: number, from_dir: string, to_dir: string, files: string[], override_flag = fileConfig.cp_mv.OVERRIDE_NONE){
      return http.post(`${type}/${id}/files/copy`, {
        from_dir,
        to_dir,
        file_list: files,
        override_flag
      });
    },
    rename(type: number, id: number, dir: string, old_file: string, new_file: string){
      return http.put(`${type}/${id}/files/rename`, {
        dir,
        old_file,
        new_file
      });
    },
    download(type: number, id: number, dir: string, files: string[]){
      return http.post(`${type}/${id}/files/download`,
        {
          dir,
          file_list: files 
        }, 
        { 
          responseType: "blob",
        }
      );
    },
    upload(type: number, id: number, formData: FormData){
      return http.post(`${type}/${id}/files/upload`, formData);
    }
  }
};

export default api;
