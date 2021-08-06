import { FileInfo } from "@/type/fileManager"
import { ref } from "vue"

const useSelected = () => {
    const selected = ref<FileInfo[]>([]);    

    const clearSelected = () => selected.value = [];

    return {
        selected,
        clearSelected
    };
}

export default useSelected;