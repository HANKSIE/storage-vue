import CopyMoveResponse from "@/components/FileManager/type/response/CopyMoveResponse";
import ListResponse from "@/components/FileManager/type/response/ListResponse";
import MakeDirResponse from "@/components/FileManager/type/response/MakeDirResponse";
import RenameResponse from "@/components/FileManager/type/response/RenameResponse";
import UploadResponse from "@/components/FileManager/type/response/UploadResponse";
import DownloadResponse from "@/components/FileManager/type/response/DownloadResponse";
import RemoveResponse from "@/components/FileManager/type/response/RemoveResponse";

import CopyMoveData from "@/components/FileManager/type/request/CopyMoveData";
import ListData from "@/components/FileManager/type/request/ListData";
import MakeDirData from "@/components/FileManager/type/request/MakeDirData";
import RenameData from "@/components/FileManager/type/request/RenameData";
import UploadData from "@/components/FileManager/type/request/UploadData";
import DownloadData from "@/components/FileManager/type/request/DownloadData";
import RemoveData from "@/components/FileManager/type/request/RemoveData";


import http from "@/utils/http";
import { AxiosResponse } from "axios";
import FileManagerApi from "@/components/FileManager/type/api";


const api: FileManagerApi = {
    list(data: ListData): Promise<AxiosResponse<ListResponse>> {
      const { type, id, dir, options } = data;
      return http.post(`${type}/${id}/files`,{
        dir,
        options,
      });
    },
    mkdir(data: MakeDirData): Promise<AxiosResponse<MakeDirResponse>>{
      const { type, id, dir, filename } = data;
      return http.post(`${type}/${id}/files/mkdir`, {
        dir,
        filename
      });
    },
    remove(data: RemoveData): Promise<AxiosResponse<RemoveResponse>> {
      const { type, id, dir, filenames } = data;
      return http.delete(`${type}/${id}/files/remove`, {
        data: {
          dir,
          filenames
        }
      });
    },
    move(data: CopyMoveData): Promise<AxiosResponse<CopyMoveResponse>>{
      const { type, id, fromDir, toDir, filenames, options } = data;
      return http.put(`${type}/${id}/files/move`, {
        fromDir,
        toDir,
        filenames,
        options
      });
    },
    copy(data: CopyMoveData): Promise<AxiosResponse<CopyMoveResponse>>{
      const { type, id, fromDir, toDir, filenames, options } = data;
      return http.post(`${type}/${id}/files/copy`, {
        fromDir,
        toDir,
        filenames,
        options
      });
    },
    rename(data: RenameData): Promise<AxiosResponse<RenameResponse>>{
      const { type, id, dir, oldFileName, newFileName } = data;
      return http.put(`${type}/${id}/files/rename`, {
        dir,
        oldFileName,
        newFileName
      });
    },
    download(data: DownloadData): Promise<AxiosResponse<DownloadResponse>> {
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
    upload(data: UploadData): Promise<AxiosResponse<UploadResponse>>{
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
