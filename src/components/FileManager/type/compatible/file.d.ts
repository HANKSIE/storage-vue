declare global {
    interface FileList {
        [Symbol.iterator](): Iterator<File>;
    }

    interface File {
        webkitRelativePath: string;
    }

    interface FileSystemEntry {
        readonly filesystem: FileSystem;
        readonly fullPath: string;
        readonly isDirectory: boolean;
        readonly isFile: boolean;
        readonly name: string;
        getParent(successCallback?: FileSystemEntryCallback, errorCallback?: ErrorCallback): void;
    }

    interface FileSystemFileEntry extends FileSystemEntry {
        file(successCallback: FileCallback, errorCallback?: ErrorCallback): void;
    }

    interface FileSystemDirectoryEntry extends FileSystemEntry {
        createReader(): FileSystemDirectoryReader;
        getDirectory(path?: string | null, options?: FileSystemFlags, successCallback?: FileSystemEntryCallback, errorCallback?: ErrorCallback): void;
        getFile(path?: string | null, options?: FileSystemFlags, successCallback?: FileSystemEntryCallback, errorCallback?: ErrorCallback): void;
    }

    /** @deprecated */
    interface FileSystemDirectoryReader {
        /** @deprecated */
        readEntries(successCallback: FileSystemEntriesCallback, errorCallback?: ErrorCallback): void;
    }
}

export {}