import http from "@/utils/http";
import fileManagerConfig from "@/config/filemanager";
import { AxiosResponse } from "axios";
import { CopyMoveResponse, ListResponse, MakeDirResponse, RenameResponse, UploadResponse } from "@/type/response/fileManager";

const api = {
    list(type: number, id: number, dir: string, options = fileManagerConfig.LIST_ALL): Promise<AxiosResponse<ListResponse>> {
        return http.post(`${type}/${id}/files`,{
          dir,
          options,
        });
      },
      mkdir(type: number, id: number, dir: string, filename: string): Promise<AxiosResponse<MakeDirResponse>>{
        return http.post(`${type}/${id}/files/mkdir`, {
          dir,
          filename
        });
      },
      remove(type: number, id: number, dir: string, filenames: string[]): Promise<AxiosResponse<void>> {
        return http.delete(`${type}/${id}/files/remove`, {
          data: {
            dir,
            filenames
          }
        });
      },
      move(type: number, id: number, fromDir: string, toDir: string, filenames: string[], options = fileManagerConfig.OVERRIDE_NONE): Promise<AxiosResponse<CopyMoveResponse>>{
        return http.put(`${type}/${id}/files/move`, {
          fromDir,
          toDir,
          filenames,
          options
        });
      },
      copy(type: number, id: number, fromDir: string, toDir: string, filenames: string[], options = fileManagerConfig.OVERRIDE_NONE): Promise<AxiosResponse<CopyMoveResponse>>{
        return http.post(`${type}/${id}/files/copy`, {
          fromDir,
          toDir,
          filenames,
          options
        });
      },
      rename(type: number, id: number, dir: string, oldFileName: string, newFileName: string): Promise<AxiosResponse<RenameResponse>>{
        return http.put(`${type}/${id}/files/rename`, {
          dir,
          oldFileName,
          newFileName
        });
      },
      download(type: number, id: number, dir: string, filenames: string[]){
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
      upload(type: number, id: number, dir: string, filePaths: string[], files: File[], options: number): Promise<AxiosResponse<UploadResponse>>{
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
