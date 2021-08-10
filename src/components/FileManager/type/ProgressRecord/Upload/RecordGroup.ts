import UploadRecord from "./UploadRecord";

type KeepBothRelaceFunc = (
    group: RecordGroup, 
    record: UploadRecord, 
    dir: string,
    filePaths: string[],
    files: File[],
    ) => Promise<void>

class RecordGroup {
    constructor(
        public actionText: string,
        public records: UploadRecord[],
        public keepBoth: KeepBothRelaceFunc,
        public replace: KeepBothRelaceFunc
    ){}
}

export default RecordGroup;
export { KeepBothRelaceFunc };