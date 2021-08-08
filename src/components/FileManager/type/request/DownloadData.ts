import BaseData from "./BaseData";

type DownloadData = BaseData & {
    dir: string
    filenames: string[]
}

export default DownloadData;