import FileInfo from "@/components/FileManager/type/fileInfo";

type RenameResponse = {
    exist: boolean,
    isSuccess: boolean,
    fileInfo: FileInfo|null
}

export default RenameResponse;