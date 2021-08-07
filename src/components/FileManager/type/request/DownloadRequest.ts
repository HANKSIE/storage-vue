import BaseRequest from "./BaseRequest";

type DownloadRequest = BaseRequest & {
    dir: string
    filenames: string[]
}

export default DownloadRequest;