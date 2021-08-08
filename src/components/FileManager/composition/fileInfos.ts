import FileInfo from "../type/fileInfo";
import { ref, Ref } from "vue"

type FileInfosRef = Ref<FileInfo[]>;

const useFileInfos = () => {
    const fileInfos: FileInfosRef = ref<FileInfo[]>([]);

    const setFileInfos = (fileInfos: FileInfosRef, infos: FileInfo[]): void => {
        fileInfos.value = infos;
    }
    const removeFileInfos = (fileInfos: FileInfosRef, filenames: string[]): void => {
        fileInfos.value = fileInfos.value.filter((info) => !filenames.includes(info.name));
    }
    const addFileInfos = (fileInfos: FileInfosRef, infos: FileInfo[]): void => {
        fileInfos.value = infos.concat(fileInfos.value);
    }
    const replaceFileInfo = (fileInfos: FileInfosRef, name: string, info: FileInfo): void => {
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

export { FileInfosRef };