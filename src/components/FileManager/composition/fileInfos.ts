import { FileInfo } from "@/type/fileManager"
import { ref } from "vue"

const useFileInfos = () => {
    const fileInfos = ref<FileInfo[]>(
        [
            {
              name: "test1.jpg",
              dir: "/",
              mime: "image/jpeg",
              lastModified: "2021-08-06 11:57:10",
              size: "10 MB",
            },
            {
              name: "test2.jpg",
              dir: "/",
              mime: "image/jpeg",
              lastModified: "2021-08-06 11:57:10",
              size: "10 MB",
            },
            {
              name: "test3.jpg",
              dir: "/",
              mime: "image/jpeg",
              lastModified: "2021-08-06 11:57:10",
              size: "10 MB",
            },
        ]
    );
    const setFileInfos = (infos: FileInfo[]): void => {
        fileInfos.value = infos;
    }
    const removeFileInfos = (names: string[]): void => {
        fileInfos.value = fileInfos.value.filter((info) => !names.includes(info.name));
    }
    const addFileInfos = (infos: FileInfo[]): void => {
        fileInfos.value = fileInfos.value.concat(infos);
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