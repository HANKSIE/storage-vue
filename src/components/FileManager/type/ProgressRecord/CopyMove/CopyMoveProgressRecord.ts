import { FileInfo } from "@/type/fileManager";
import RedoProgressRecord from "../RedoProgressRecord";

abstract class CopyMoveProgressRecord extends RedoProgressRecord {

    public fromDir: string;
    public toDir: string;
    public fileInfo: FileInfo[];

    constructor(fromDir: string, toDir: string, fileInfo: FileInfo[]){
        super();
        this.fromDir = fromDir;
        this.toDir = toDir;
        this.fileInfo = fileInfo;
    }
}

export default CopyMoveProgressRecord;