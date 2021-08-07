import FileInfo from "@/components/FileManager/type/fileInfo";

type CopyMoveResponse = {
    fileInfos: FileInfo[], 
    exists: string[],
    notExists: string[],
    selfs: string[]
}

export default CopyMoveResponse;