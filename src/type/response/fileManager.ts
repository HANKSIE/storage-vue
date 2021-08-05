import { FileInfo } from "../fileManager";

export interface ListResponse {
    fileInfos: FileInfo[]
}

export interface MakeDirResponse {
    exist: boolean,
    isSuccess: boolean,
    fileInfo: FileInfo|null
}

export interface RemoveResponse {
    fails: string[],
    notExists: string[]
}

export interface MoveResponse {
    fileInfos: FileInfo[], 
    exists: string[],
    notExists: string[],
    selfs: string[]
}

export interface CopyResponse {
    fileInfos: FileInfo[], 
    exists: string[],
    notExists: string[],
    selfs: string[]
}

export interface RenameResponse {
    exist: boolean,
    isSuccess: boolean,
    fileInfo: FileInfo|null
}

export interface UploadResponse {
    exists: string[],
    fileInfos: FileInfo[]
}