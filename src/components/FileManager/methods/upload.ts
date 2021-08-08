import fileManagerApi from "@/utils/api/filemanager"; 
import useFileInfos, { FileInfosRef } from "../composition/fileInfos";
import UploadData from "../type/request/UploadData";

const { addFileInfos } = useFileInfos();

const upload = async (fileInfosRef: FileInfosRef, data: UploadData): Promise<void> => {
    try{
        const res = await fileManagerApi.upload(data);
        const { exists, fileInfos } = res.data;

        addFileInfos(fileInfosRef, fileInfos);

        //TODO add exists to progressGroups
    }catch(err){
        console.error(err);
    }
}

export default upload;