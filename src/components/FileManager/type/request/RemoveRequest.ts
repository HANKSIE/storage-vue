import BaseRequest from "./BaseRequest";

type RemoveRequest = BaseRequest & {
    dir: string
    filenames: string[]
}

export default RemoveRequest;