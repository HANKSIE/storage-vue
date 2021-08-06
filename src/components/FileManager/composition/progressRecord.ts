import { ref } from "vue";
import ProgressRecord from "../type/ProgressRecord/ProgressRecord";

const useProgressRecords = () => {
    const progressRecordLists = ref<ProgressRecord[][][]>([]);

    return {
        progressRecordLists,
    }
}

export default useProgressRecords;