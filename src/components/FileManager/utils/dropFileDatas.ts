import FileData from "../type/fileData";

const getDropFileDatas = async (items: DataTransferItemList): Promise<FileData> => {
    const files: File[] = [];
    const filePaths: string[] = [];

    // Use BFS to traverse entire directory/file structure
    const queue: FileSystemEntry[] = [];

    // Unfortunately dataTransferItemList is not iterable i.e. no forEach
    for (let i = 0; i < items.length; i++) {
        const entry: FileSystemEntry|null = items[i].webkitGetAsEntry();
        if(entry){
            queue.push(entry);
        }
    }

    while (queue.length > 0) {
      const entry: FileSystemEntry|undefined = queue.shift();
      
      if (entry?.isFile) {
        files.push(await getFile(entry as FileSystemFileEntry));
        filePaths.push(entry.fullPath);
      } else if (entry?.isDirectory) {
        const entries = await readAllDirectoryEntries((entry as FileSystemDirectoryEntry).createReader());

        if(entries){
          queue.push(...entries);
        }
      }
    }

    return {
        files,
        filePaths
    }
};

const getFile = (entry: FileSystemFileEntry): Promise<File> => {
    return new Promise((resolve) => {
      entry.file((file: File) => {
        resolve(file);
      });
    });
};

  // Get all the entries (files or sub-directories) in a directory
  // by calling readEntries until it returns empty array
const readAllDirectoryEntries = async (directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]|void> => {
    const entries: FileSystemEntry[] = [];
    let readEntries = await readEntriesPromise(directoryReader);
    if(readEntries){
      while (readEntries!.length > 0) {
        entries.push(...readEntries!);
        readEntries = await readEntriesPromise(directoryReader);
      }
      return entries;
    }
  };

  // Wrap readEntries in a promise to make working with readEntries easier
  // readEntries will return only some of the entries in a directory
  // e.g. Chrome returns at most 100 entries at a time
  const readEntriesPromise = async (directoryReader: FileSystemDirectoryReader): Promise<void | FileSystemEntry[]> => {
    try {
      const result: FileSystemEntry[] = await new Promise((resolve, reject) => {
          directoryReader.readEntries(resolve, reject);
      });
        
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  export default getDropFileDatas;