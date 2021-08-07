import BaseRequest from "./BaseRequest";

type MakeDirResponse = BaseRequest & {
    dir: string
    filename: string
}

export default MakeDirResponse;