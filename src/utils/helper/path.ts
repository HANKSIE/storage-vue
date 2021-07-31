export default class PathHelper {
    static pathformat(path: string): string{
        path = path.replace(/\\+/g, "/");
        path = path.replace(/\/+/g, "/");
        return path;

    }

    static splitPathWithoutEmpty(path:string): Array<string>{
        path = PathHelper.pathformat(path);
        return path.split("/").filter((el) => !!el);
    }

    static extension(name: string) {
        return name.includes(".") ? name.split(".").reverse()[0] : "";
    }
  
    static basename(path: string){
        path = PathHelper.pathformat(path);
        return path.split("/").reverse()[0];
    }

    static root(path:string) {
        path = PathHelper.pathformat(path);
        if(!path.includes("/")){
            return "";
        }

        if(path[0] === "/"){
            path = Array.from(path).slice(1).join("");
        }

        return path.split("/")[0];
    }
}