import BaseData from "./BaseData";

type RenameData = BaseData & {
    dir: string
    oldFileName: string
    newFileName: string
}

export default RenameData;