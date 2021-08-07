import BaseRequest from "./BaseRequest"

type CopyMoveRequest = BaseRequest & {
    fromDir: string
    toDir: string
    filenames: string[]
    options: number
}

export default CopyMoveRequest;