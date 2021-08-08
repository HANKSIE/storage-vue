import BaseData from "./BaseData";

type UploadData = BaseData & {
    dir: string
    filePaths: string[]
    files: File[] | FileList
    options: number
}

export default UploadData;