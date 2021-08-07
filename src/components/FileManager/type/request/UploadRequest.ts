import BaseRequest from "./BaseRequest";

type UploadRequest = BaseRequest & {
    dir: string
    filePaths: string[]
    files: File[]
    options: number
}

export default UploadRequest;