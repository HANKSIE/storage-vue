import FileInfo from "../type/fileInfo";
import { ref, Ref } from "vue";

type Selected = FileInfo[];

type SelectedRef = Ref<Selected>;

const useSelected = () => {
    const selected: SelectedRef = ref<Selected>([]);    

    const clearSelected = (selected: SelectedRef) => selected.value = [];

    return {
        selected,
        clearSelected
    };
}

export default useSelected;
export { Selected, SelectedRef };