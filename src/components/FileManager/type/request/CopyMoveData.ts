import BaseData from "./BaseData"

type CopyMoveData = BaseData & {
    fromDir: string
    toDir: string
    filenames: string[]
    options: number
}

export default CopyMoveData;