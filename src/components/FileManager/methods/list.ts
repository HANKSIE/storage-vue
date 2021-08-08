import fileManagerApi from "@/utils/api/filemanager"; 
import useFileInfos, { FileInfosRef } from "../composition/fileInfos";
import ListData from "../type/request/ListData";

const { setFileInfos } = useFileInfos();

const list = async (fileInfosRef: FileInfosRef, data: ListData): Promise<void> => {
    try{
        const res = await fileManagerApi.list(data);
        const { fileInfos } = res.data;
        setFileInfos(fileInfosRef, fileInfos);
    }catch(err){
        console.error(err);
    }
}

export default list;