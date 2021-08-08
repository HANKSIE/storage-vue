import FileInfo from "@/components/FileManager/type/fileInfo";

type UploadResponse = {
    fails: string[],
    exists: string[],
    fileInfos: FileInfo[]
}

export default UploadResponse;