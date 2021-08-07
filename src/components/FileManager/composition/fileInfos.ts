import FileInfo from "../type/fileInfo";
import { ref, Ref } from "vue"

type RefFileInfos = Ref<FileInfo[]>;

const useFileInfos = () => {
    const fileInfos: RefFileInfos = ref<FileInfo[]>([]);

    const setFileInfos = (fileInfos: RefFileInfos, infos: FileInfo[]): void => {
        fileInfos.value = infos;
    }
    const removeFileInfos = (fileInfos: RefFileInfos, names: string[]): void => {
        fileInfos.value = fileInfos.value.filter((info) => !names.includes(info.name));
    }
    const addFileInfos = (fileInfos: RefFileInfos, infos: FileInfo[]): void => {
        fileInfos.value = fileInfos.value.concat(infos);
    }
    const replaceFileInfo = (fileInfos: RefFileInfos, name: string, info: FileInfo): void => {
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

export { RefFileInfos };