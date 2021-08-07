import BaseRequest from "./BaseRequest";

type ListRequest = BaseRequest & {
    dir: string
    options: number
}

export default ListRequest;