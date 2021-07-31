import { FileInfo } from "../fileManager";

export interface ListResponse {
    items: FileInfo[]
}

export interface MakeDirResponse {
    dir: FileInfo
}