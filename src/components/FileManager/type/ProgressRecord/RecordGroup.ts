import CopyMoveRecord from "./CopyMove/CopyMoveRecord";
import SelfRecord from "./CopyMove/SelfRecord";
import UploadRecord from "./UploadRecord";

type Record = CopyMoveRecord|SelfRecord|UploadRecord;

type KeepBothReplaceFunc = (group: RecordGroup, record: Record) => any;

class RecordGroup {

    constructor(
        public records: Array<Record>,
        public keepBoth: KeepBothReplaceFunc,
        public replace: KeepBothReplaceFunc
    ){}

    add(record: CopyMoveRecord|SelfRecord|UploadRecord): void{
        this.records.push(record);
    }

    remove(record: CopyMoveRecord|SelfRecord|UploadRecord): void{
        this.records = this.records.filter(r => r !== record);
    }
}

export { KeepBothReplaceFunc };
export default RecordGroup;