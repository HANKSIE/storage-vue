import { AxiosResponse } from "axios";

import CopyMoveResponse from "./response/CopyMoveResponse";
import ListResponse from "./response/ListResponse";
import MakeDirResponse from "./response/MakeDirResponse";
import RenameResponse from "./response/RenameResponse";
import UploadResponse from "./response/UploadResponse";
import DownloadResponse from "./response/DownloadResponse";
import RemoveResponse from "./response/RemoveResponse";

import CopyMoveRequest from "./request/CopyMoveRequest";
import ListRequest from "./request/ListRequest";
import MakeDirRequest from "./request/MakeDirRequest";
import RenameRequest from "./request/RenameRequest";
import UploadRequest from "./request/UploadRequest";
import DownloadRequest from "./request/DownloadRequest";
import RemoveRequest from "./request/RemoveRequest";

// fetch/axios response
type Response<T> = Promise<AxiosResponse<T>>;

type Api = {
    list(data: ListRequest): Response<ListResponse>
    mkdir(data: MakeDirRequest): Response<MakeDirResponse>
    remove(data: RemoveRequest): Response<RemoveResponse>
    move(data: CopyMoveRequest): Response<CopyMoveResponse>
    copy(data: CopyMoveRequest): Response<CopyMoveResponse>
    rename(data: RenameRequest): Response<RenameResponse>
    download(data: DownloadRequest): Response<DownloadResponse>
    upload(data: UploadRequest): Response<UploadResponse>
}

export default Api;