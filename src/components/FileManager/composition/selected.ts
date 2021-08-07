import FileInfo from "../type/fileInfo";
import { ref, Ref } from "vue"

type RefSelected = Ref<FileInfo[]>;

const useSelected = () => {
    const selected: RefSelected = ref<FileInfo[]>([]);    

    const clearSelected = (selected: RefSelected) => selected.value = [];

    return {
        selected,
        clearSelected
    };
}

export default useSelected;
export { RefSelected };