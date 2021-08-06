import { FileInfo } from "@/type/fileManager";
import RedoProgressRecord from "./RedoProgressRecord";

class UploadProgressRecord extends RedoProgressRecord {
    public dir: string;
    public rootFileName: string;
    public files: File[];
    public filePaths: string[];
    
    constructor(dir: string, rootFileName: string, files: File[], filePaths: string[]){
        super();
        this.dir = dir;
        this.rootFileName = rootFileName;
        this.files = files;
        this.filePaths = filePaths;
    }

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

export default UploadProgressRecord;