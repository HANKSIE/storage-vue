import FileInfo from "../../../type/fileInfo";

type CopyMoveRecord = {
    fromDir: string;
    toDir: string;
    fileInfo: FileInfo;
}

export default CopyMoveRecord;