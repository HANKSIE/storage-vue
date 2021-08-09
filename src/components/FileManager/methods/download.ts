import fileManagerApi from "@/utils/api/filemanager"; 

import useSelected, { SelectedRef } from "../composition/selected";
import DownloadData from "../type/request/DownloadData";

const { clearSelected } = useSelected();

const download = async (selectedRef: SelectedRef, data: DownloadData): Promise<void> => {
    try{
        const res = await fileManagerApi.download(data);
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(res.data);
        a.href = url;
        const contentDisposition = res.headers["content-disposition"];
        const filename = contentDisposition.match(/filename=(.+)/)[1];
        a.download = decodeURIComponent(filename);
        a.click();
        window.URL.revokeObjectURL(url);
        clearSelected(selectedRef)
    }catch(err){
        console.error(err);
    }
}

export default download;