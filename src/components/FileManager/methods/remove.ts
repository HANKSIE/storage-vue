import fileManagerApi from "@/utils/api/filemanager"; 
import useFileInfos, { FileInfosRef } from "../composition/fileInfos";
import useSelected, { SelectedRef } from "../composition/selected";
import RemoveData from "../type/request/RemoveData";

const { removeFileInfos } = useFileInfos();
const { clearSelected } = useSelected();

const remove = async (fileInfosRef: FileInfosRef, SelectedRef: SelectedRef, data: RemoveData): Promise<void> => {
    try{

        const res = await fileManagerApi.remove(data);
        const { successes } = res.data;

        removeFileInfos(fileInfosRef, successes);
        
        clearSelected(SelectedRef);
    }catch(err){
        console.error(err);
    }
}

export default remove;