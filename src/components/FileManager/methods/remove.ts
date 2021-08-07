import fileManagerApi from "@/utils/api/filemanager"; 
import useFileInfos, { RefFileInfos } from "../composition/fileInfos";
import useSelected, { RefSelected } from "../composition/selected";

const { removeFileInfos } = useFileInfos();
const { clearSelected } = useSelected();

const remove = async (refFileInfos: RefFileInfos, refSelected: RefSelected, type: string, id: number, dir: string): Promise<void> => {
    try{
        const filenames = refSelected.value.map(info => info.name);
        const res = await fileManagerApi.remove({type, id, dir, filenames});
        const { fails, notExists } = res.data;

        const removeFileNames = refFileInfos.value
        .filter(info => !fails.includes(info.name) || notExists.includes(info.name))
        .map(info => info.name);

        removeFileInfos(refFileInfos, removeFileNames);
        
        clearSelected(refSelected);
    }catch(err){
        console.error(err);
    }
}

export default remove;