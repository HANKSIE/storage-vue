import fileConfig from "@/config/file";

export default class FileIcon {
    
    static icon(mimeType: string): File{
        const iconConfig = fileConfig.icon;
        const [type, verbose] = mimeType.split("/");
        const general = ["image", "audio", "video"];
        let icon = "";
        if(type == "directory"){
            icon = iconConfig[type];
        }else if(general.includes(type)){
            icon = iconConfig.mime[type];
        }else if(iconConfig.mime[type]){
            icon = iconConfig.mime[type][verbose];
        }
        
        if(!icon){
            icon = iconConfig["default"];
        }
        
        return require(`@/assets/file/${icon}.png`);
    }
}