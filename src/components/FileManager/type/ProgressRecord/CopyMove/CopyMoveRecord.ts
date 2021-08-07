import FileInfo from "../../../type/fileInfo";

interface CopyMoveRecord {
    fromDir: string;
    toDir: string;
    fileInfo: FileInfo;
}

export default CopyMoveRecord;