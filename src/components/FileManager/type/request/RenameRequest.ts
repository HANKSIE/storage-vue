import BaseRequest from "./BaseRequest";

type RenameRequest = BaseRequest & {
    dir: string
    oldFileName: string
    newFileName: string
}

export default RenameRequest;