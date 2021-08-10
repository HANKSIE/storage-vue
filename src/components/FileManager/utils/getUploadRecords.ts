import UploadRecord from "../type/ProgressRecord/Upload/UploadRecord";
import PathHelper from "./path";

const getUploadRecords = (exists: string[], dir: string, paths: string[], files: File[]): UploadRecord[] => {
    const records: UploadRecord[] = [];
    const length = paths.length;

    for(let i=0; i<length; i++){
      const path = paths[i], file = files[i];
      const rootFileName = PathHelper.rootFileName(path);
      
      if (exists.includes(rootFileName)) {
          const record = records.find(g => g.rootFileName === rootFileName);
        if (!record) { //null
            records.push({
                dir,
                rootFileName,
                files: [file],
                filePaths: [path]
            });
        }else{
            record.files.push(file);
            record.filePaths.push(path);
        }
      }
    }

    return records;
}

export default getUploadRecords;