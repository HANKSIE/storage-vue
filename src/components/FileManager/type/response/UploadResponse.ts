import FileInfo from "@/components/FileManager/type/fileInfo";

type UploadResponse = {
    exists: string[],
    fileInfos: FileInfo[]
}

export default UploadResponse;