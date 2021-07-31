import pathHelper from "@/utils/helper/path";
export default class UploadMiscellaneous {

    static getUploadFormData(paths, files) {
      const formData = new FormData();

      const length = files.length;
      for (let i = 0; i < length; i++) {
        formData.append(paths[i], files[i]);
      }

      return formData;
    }

    static uploadExistGroup(exists, paths, files) {
      const group = {};
      const length = paths.length;

      for(let i=0; i<length; i++){
        const path = paths[i], file = files[i];
        const rootDir = pathHelper.root(path);
        const rootItem = rootDir.length === 0 ? path : rootDir;
        
        if (exists.includes(rootItem)) {
          if (!group[rootItem]) {
            group[rootItem] = {};
            group[rootItem].files = [];
            group[rootItem].paths = [];
          }
          group[rootItem].files.push(file);
          group[rootItem].paths.push(path);
        }
      }

      return group;
    }
}