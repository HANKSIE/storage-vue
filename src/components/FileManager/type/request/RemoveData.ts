import BaseData from "./BaseData";

type RemoveData = BaseData & {
    dir: string
    filenames: string[]
}

export default RemoveData;