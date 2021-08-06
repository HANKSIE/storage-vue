import { FileInfo } from "@/type/fileManager";
import ProgressRecord from "./ProgressRecord";

abstract class RedoProgressRecord extends ProgressRecord{
    public abstract keepBoth(fileInfo: FileInfo): any;
    public abstract replace(fileInfo: FileInfo): any;
}

export default RedoProgressRecord;