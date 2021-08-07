import { ref , Ref} from "vue";
import RecordGroup from "../type/ProgressRecord/RecordGroup";

type RefRecordGroups = Ref<RecordGroup[]>;

const useRecordGroups = () => {
    const recordGroups: RefRecordGroups = ref<RecordGroup[]>([]);

    const removeGroup = (groups: RefRecordGroups,  group: RecordGroup): void => {
        groups.value = recordGroups.value.filter(g => g !== group);
    }
    const addGroup = (groups: RefRecordGroups, group: RecordGroup): void => {
        groups.value.unshift(group);
    }

    return {
        recordGroups,
        removeGroup,
        addGroup
    }
}

export default useRecordGroups;

export { RefRecordGroups };