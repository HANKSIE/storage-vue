import mimeIcon from "../config/mimeIcon";

const getMimeIcon = (mime: string): File => {
    const [type, verbose] = mime.split("/");
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
    
    return require(`../assets/images/file/${icon}.png`);
}

export default getMimeIcon;