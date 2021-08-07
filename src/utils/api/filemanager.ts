import CopyMoveResponse from "@/components/FileManager/type/response/CopyMoveResponse";
import ListResponse from "@/components/FileManager/type/response/ListResponse";
import MakeDirResponse from "@/components/FileManager/type/response/MakeDirResponse";
import RenameResponse from "@/components/FileManager/type/response/RenameResponse";
import UploadResponse from "@/components/FileManager/type/response/UploadResponse";

import CopyMoveRequest from "@/components/FileManager/type/request/CopyMoveRequest";
import ListRequest from "@/components/FileManager/type/request/ListRequest";
import MakeDirRequest from "@/components/FileManager/type/request/MakeDirRequest";
import RenameRequest from "@/components/FileManager/type/request/RenameRequest";
import UploadRequest from "@/components/FileManager/type/request/UploadRequest";
import DownloadRequest from "@/components/FileManager/type/request/DownloadRequest";

import http from "@/utils/http";
import { AxiosResponse } from "axios";
import RemoveRequest from "@/components/FileManager/type/request/RemoveRequest";
const api = {
    list(data: ListRequest): Promise<AxiosResponse<ListResponse>> {
      const { type, id, dir, options } = data;
      return http.post(`${type}/${id}/files`,{
        dir,
        options,
      });
    },
    mkdir(data: MakeDirRequest): Promise<AxiosResponse<MakeDirResponse>>{
      const { type, id, dir, filename } = data;
      return http.post(`${type}/${id}/files/mkdir`, {
        dir,
        filename
      });
    },
    remove(data: RemoveRequest): Promise<AxiosResponse<void>> {
      const { type, id, dir, filenames } = data;
      return http.delete(`${type}/${id}/files/remove`, {
        data: {
          dir,
          filenames
        }
      });
    },
    move(data: CopyMoveRequest): Promise<AxiosResponse<CopyMoveResponse>>{
      const { type, id, fromDir, toDir, filenames, options } = data;
      return http.put(`${type}/${id}/files/move`, {
        fromDir,
        toDir,
        filenames,
        options
      });
    },
    copy(data: CopyMoveRequest): Promise<AxiosResponse<CopyMoveResponse>>{
      const { type, id, fromDir, toDir, filenames, options } = data;
      return http.post(`${type}/${id}/files/copy`, {
        fromDir,
        toDir,
        filenames,
        options
      });
    },
    rename(data: RenameRequest): Promise<AxiosResponse<RenameResponse>>{
      const { type, id, dir, oldFileName, newFileName } = data;
      return http.put(`${type}/${id}/files/rename`, {
        dir,
        oldFileName,
        newFileName
      });
    },
    download(data: DownloadRequest){
      const { type, id, dir, filenames } = data;
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
    upload(data: UploadRequest): Promise<AxiosResponse<UploadResponse>>{
      const { type, id, dir, filePaths, files, options } = data;
      const formData = new FormData();
      for(let i=0; i<filePaths.length; i++){
        formData.append(filePaths[i], files[i]);
      }
      formData.append('dir', dir);
      formData.append('options', options.toString());

      return http.post(`${type}/${id}/files/upload`, formData);
    }
};

export default api;
