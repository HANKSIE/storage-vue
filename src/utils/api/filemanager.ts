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
import Api from "@/components/FileManager/type/api";

class FileManagerApi implements Api {
  private baseURL: string

  constructor(baseURL: string){
    this.baseURL = baseURL;
  }

  public list(data: ListData): Promise<AxiosResponse<ListResponse>> {
    const { dir, options } = data;
    return http.post(`${this.baseURL}/files`,{
      dir,
      options,
    });
  }

  public mkdir(data: MakeDirData): Promise<AxiosResponse<MakeDirResponse>>{
    const { dir, filename } = data;
    return http.post(`${this.baseURL}/files/mkdir`, {
      dir,
      filename
    });
  }

  public remove(data: RemoveData): Promise<AxiosResponse<RemoveResponse>> {
    const { dir, filenames } = data;
    return http.delete(`${this.baseURL}/files/remove`, {
      data: {
        dir,
        filenames
      }
    });
  }

  public move(data: CopyMoveData): Promise<AxiosResponse<CopyMoveResponse>>{
    const { fromDir, toDir, filenames, options } = data;
    return http.put(`${this.baseURL}/files/move`, {
      fromDir,
      toDir,
      filenames,
      options
    });
  }

  public copy(data: CopyMoveData): Promise<AxiosResponse<CopyMoveResponse>>{
    const { fromDir, toDir, filenames, options } = data;
    return http.post(`${this.baseURL}/files/copy`, {
      fromDir,
      toDir,
      filenames,
      options
    });
  }

  public rename(data: RenameData): Promise<AxiosResponse<RenameResponse>>{
    const { dir, oldFileName, newFileName } = data;
    return http.put(`${this.baseURL}/files/rename`, {
      dir,
      oldFileName,
      newFileName
    });
  }

  public download(data: DownloadData): Promise<AxiosResponse<DownloadResponse>> {
    const { dir, filenames } = data;
    return http.post(`${this.baseURL}/files/download`,
      {
        dir,
        filenames
      }, 
      { 
        responseType: "blob",
      }
    );
  }

  public upload(data: UploadData): Promise<AxiosResponse<UploadResponse>>{
    const { dir, filePaths, files, options } = data;
    const formData = new FormData();
    for(let i=0; i<filePaths.length; i++){
      formData.append(filePaths[i], files[i]);
    }
    formData.append('dir', dir);
    formData.append('options', options.toString());

    return http.post(`${this.baseURL}/files/upload`, formData);
  }
}

export default FileManagerApi;
