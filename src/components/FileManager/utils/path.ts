export default class PathHelper {
    static format(path: string): string{
        path = path.replace(/\\+/g, "/");
        path = path.replace(/\/+/g, "/");
        return path;
    }

    static concat(...args: string[]): string{
        const str = args.reduce((carry, value) => `${carry}/${value}`);
        return PathHelper.format(str);
    }

    static extension(name: string) {
        return name.includes(".") ? name.split(".").reverse()[0] : "";
    }
  
    static basename(path: string, withExt = true){
        path = PathHelper.format(path);
        const basename = path.split("/").reverse()[0];
        if(!withExt){
            const ext = PathHelper.extension(basename);
            const lastPos  = basename.lastIndexOf(ext);
            return basename.substring(0, lastPos-1);
        }else{
            return basename;
        }
    }

    static rootFileName(path: string) {
        path = PathHelper.format(path);
        if(!path.includes("/")){
            return "";
        }

        if(path[0] === "/"){
            path = Array.from(path).slice(1).join("");
        }

        return path.split("/")[0];
    }
}