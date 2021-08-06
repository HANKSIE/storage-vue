import ProgressRecord from "../ProgressRecord";

class SelfRecord extends ProgressRecord {
    public text(): string {
        return "The destination folder is the same as the source folder.";
    }
}

export default SelfRecord;