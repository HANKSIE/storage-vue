import FileInfo from "../type/fileInfo";
import { ref } from "vue"

const useFileInfos = () => {
    const fileInfos = ref<FileInfo[]>([]);

    const setFileInfos = (infos: FileInfo[]): void => {
        fileInfos.value = infos;
    }
    const getFileInfos = (names: string[]): FileInfo[] => {
        return fileInfos.value.filter(info => names.includes(info.name))
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
        getFileInfos,
        removeFileInfos,
        addFileInfos,
        replaceFileInfo
    };
}

export default useFileInfos;