import mimeIcon from "@/config/mimeIcon";

export default class FileIcon {
    
    static icon(mimeType: string): File{
        const [type, verbose] = mimeType.split("/");
        const general = ["image", "audio", "video"];
        let icon = "";
        if(type == "directory"){
            icon = mimeIcon["directory"];
        }else if(general.includes(type)){
            icon = mimeIcon[type];
        }else if(mimeIcon[type]){
            icon = mimeIcon[type][verbose];
        }
        
        if(!icon){
            icon = mimeIcon["default"];
        }
        
        return require(`@/assets/file/${icon}.png`);
    }
}