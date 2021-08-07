import CopyMoveResponse from "@/components/FileManager/response/CopyMoveResponse";
import ListResponse from "@/components/FileManager/response/ListResponse";
import MakeDirResponse from "@/components/FileManager/response/MakeDirResponse";
import RenameResponse from "@/components/FileManager/response/RenameResponse";
import UploadResponse from "@/components/FileManager/response/UploadResponse";
import http from "@/utils/http";
import { AxiosResponse } from "axios";

const api = {
    list(type: string, id: number, dir: string, options: number): Promise<AxiosResponse<ListResponse>> {
        return http.post(`${type}/${id}/files`,{
          dir,
          options,
        });
    },
    mkdir(type: string, id: number, dir: string, filename: string): Promise<AxiosResponse<MakeDirResponse>>{
      return http.post(`${type}/${id}/files/mkdir`, {
        dir,
        filename
      });
    },
    remove(type: string, id: number, dir: string, filenames: string[]): Promise<AxiosResponse<void>> {
      return http.delete(`${type}/${id}/files/remove`, {
        data: {
          dir,
          filenames
        }
      });
    },
    move(type: string, id: number, fromDir: string, toDir: string, filenames: string[], options: number): Promise<AxiosResponse<CopyMoveResponse>>{
      return http.put(`${type}/${id}/files/move`, {
        fromDir,
        toDir,
        filenames,
        options
      });
    },
    copy(type: string, id: number, fromDir: string, toDir: string, filenames: string[], options: number): Promise<AxiosResponse<CopyMoveResponse>>{
      return http.post(`${type}/${id}/files/copy`, {
        fromDir,
        toDir,
        filenames,
        options
      });
    },
    rename(type: string, id: number, dir: string, oldFileName: string, newFileName: string): Promise<AxiosResponse<RenameResponse>>{
      return http.put(`${type}/${id}/files/rename`, {
        dir,
        oldFileName,
        newFileName
      });
    },
    download(type: string, id: number, dir: string, filenames: string[]){
      return http.post(`${type}/${id}/files/download`,
        {
          dir,
          filenames
        }, 
        { 
          responseType: "blob",
        }
      );
    },
    upload(type: string, id: number, dir: string, filePaths: string[], files: File[], options: number): Promise<AxiosResponse<UploadResponse>>{
      const data = new FormData();
      for(let i=0; i<filePaths.length; i++){
        data.append(filePaths[i], files[i]);
      }
      data.append('dir', dir);
      data.append('options', options.toString());

      return http.post(`${type}/${id}/files/upload`, data);
    }
};

export default api;
