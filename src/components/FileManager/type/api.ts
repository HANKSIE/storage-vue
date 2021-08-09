import { AxiosResponse } from "axios";

import CopyMoveResponse from "./response/CopyMoveResponse";
import ListResponse from "./response/ListResponse";
import MakeDirResponse from "./response/MakeDirResponse";
import RenameResponse from "./response/RenameResponse";
import UploadResponse from "./response/UploadResponse";
import DownloadResponse from "./response/DownloadResponse";
import RemoveResponse from "./response/RemoveResponse";

import CopyMoveData from "./request/CopyMoveData";
import ListData from "./request/ListData";
import MakeDirData from "./request/MakeDirData";
import RenameData from "./request/RenameData";
import UploadData from "./request/UploadData";
import DownloadData from "./request/DownloadData";
import RemoveData from "./request/RemoveData";

// fetch/axios response
type Response<T> = Promise<AxiosResponse<T>>;

interface Api {
    list(data: ListData): Response<ListResponse>
    mkdir(data: MakeDirData): Response<MakeDirResponse>
    remove(data: RemoveData): Response<RemoveResponse>
    move(data: CopyMoveData): Response<CopyMoveResponse>
    copy(data: CopyMoveData): Response<CopyMoveResponse>
    rename(data: RenameData): Response<RenameResponse>
    download(data: DownloadData): Response<DownloadResponse>
    upload(data: UploadData): Response<UploadResponse>
}

export default Api;