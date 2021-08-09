import FileInfo from "../type/fileInfo";
import { ref } from "vue"

const useFileInfos = () => {
    const fileInfos = ref<FileInfo[]>([]);

    const setFileInfos = (infos: FileInfo[]): void => {
        fileInfos.value = infos;
    }
    const removeFileInfos = (filenames: string[]): void => {
        fileInfos.value = fileInfos.value.filter((info) => !filenames.includes(info.name));
    }
    const addFileInfos = (infos: FileInfo[]): void => {
        fileInfos.value = infos.concat(fileInfos.value);
    }
    const replaceFileInfo = (name: string, info: FileInfo): void => {
        const pos = fileInfos.value.findIndex((info) => info.name === name);
        fileInfos.value.splice(pos, 1, info);
    }

    return {
        fileInfos,
        setFileInfos,
        removeFileInfos,
        addFileInfos,
        replaceFileInfo
    };
}

export default useFileInfos;