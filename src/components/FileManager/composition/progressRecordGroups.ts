import { ref , Ref} from "vue";
import RecordGroup from "../type/ProgressRecord/RecordGroup";

type RecordGroupsRef = Ref<RecordGroup[]>;

const useRecordGroups = () => {
    const recordGroups: RecordGroupsRef = ref<RecordGroup[]>([]);

    const removeGroup = (groups: RecordGroupsRef,  group: RecordGroup): void => {
        groups.value = recordGroups.value.filter(g => g !== group);
    }
    const addGroup = (groups: RecordGroupsRef, group: RecordGroup): void => {
        groups.value.unshift(group);
    }

    return {
        recordGroups,
        removeGroup,
        addGroup
    }
}

export default useRecordGroups;

export { RecordGroupsRef };