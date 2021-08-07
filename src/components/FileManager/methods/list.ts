import fileManagerApi from "@/utils/api/filemanager"; 
import useFileInfos, { RefFileInfos } from "../composition/fileInfos";
import optionConfig from "../config/options";

const { setFileInfos } = useFileInfos();

const list = async (refFileInfos: RefFileInfos, type: string, id: number, dir: string, options = optionConfig.LIST_ALL): Promise<void> => {
    try{
        const res = await fileManagerApi.list(type, id, dir, options);
        const { fileInfos } = res.data;
        setFileInfos(refFileInfos, fileInfos);
    }catch(err){
        console.error(err);
    }
}

export default list;