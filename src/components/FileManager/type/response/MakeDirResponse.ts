import FileInfo from "@/components/FileManager/type/fileInfo";

type MakeDirResponse = {
    exist: boolean,
    isSuccess: boolean,
    fileInfo: FileInfo|null
}

export default MakeDirResponse;