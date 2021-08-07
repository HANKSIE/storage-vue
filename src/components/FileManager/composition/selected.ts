import FileInfo from "../type/fileInfo";
import { ref, Ref } from "vue";

type Selected = FileInfo[];

type RefSelected = Ref<Selected>;

const useSelected = () => {
    const selected: RefSelected = ref<Selected>([]);    

    const clearSelected = (selected: RefSelected) => selected.value = [];

    return {
        selected,
        clearSelected
    };
}

export default useSelected;
export { Selected, RefSelected };