import { FileInfo } from "@/type/fileManager";
import CopyMoveProgressRecord from "./CopyMoveProgressRecord";


class NormalRecord extends CopyMoveProgressRecord {
    
    public text(): string {
        return "A file with this name already exists. Would you like to replace the existing one, or rename it and keep them both?";
    }

    public keepBoth(fileInfo: FileInfo) {
        //keep both
    }
    public replace(fileInfo: FileInfo) {
        //replace
    }
}

export default NormalRecord;