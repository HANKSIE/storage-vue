import BaseData from "./BaseData";

type UploadData = BaseData & {
    dir: string
    filePaths: string[]
    files: File[]
    options: number
}

export default UploadData;