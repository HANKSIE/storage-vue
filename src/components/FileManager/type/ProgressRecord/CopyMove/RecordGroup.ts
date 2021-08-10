import ExistRecord from "./ExistRecord";
import SelfRecord from "./SelfRecord";

type KeepBothRelaceFunc = (group: RecordGroup, record: ExistRecord|SelfRecord, fromDir: string, toDir: string, filename: string) => Promise<void>

class RecordGroup {
    constructor(
        public actionText: string,
        public existRecords: ExistRecord[],
        public selfRecords: SelfRecord[],
        public keepBoth: KeepBothRelaceFunc,
        public replace: KeepBothRelaceFunc
    ){}
}

export default RecordGroup;
export { KeepBothRelaceFunc };