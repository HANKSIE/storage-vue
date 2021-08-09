import FileInfo from "../type/fileInfo";
import { ref } from "vue";

type Selected = FileInfo[];

const useSelected = () => {
    const selected = ref<Selected>([]);    

    const clearSelected = () => selected.value = [];

    return {
        selected,
        clearSelected
    };
}

export default useSelected;
export { Selected };