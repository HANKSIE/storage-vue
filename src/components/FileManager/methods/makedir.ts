import fileManagerApi from "@/utils/api/filemanager"; 
import useFileInfos, { FileInfosRef } from "../composition/fileInfos";
import MakeDirData from "../type/request/MakeDirData";

const { addFileInfos } = useFileInfos();

const makedir = async (fileInfosRef: FileInfosRef, data: MakeDirData): Promise<void> => {
    try{
        const res = await fileManagerApi.mkdir(data);
        const { fileInfo, isSuccess, exist } = res.data;

        if(fileInfo){
            addFileInfos(fileInfosRef, [fileInfo]);
        }else if(!isSuccess){
            console.log("創建失敗");
        }else if(exist){
            console.log("檔案已存在: ", exist)
        }
        
    }catch(err){
        console.error(err);
    }
}

export default makedir;