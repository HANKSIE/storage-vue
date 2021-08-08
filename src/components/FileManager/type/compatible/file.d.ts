declare global {
    interface FileList {
        [Symbol.iterator](): Iterator<File>;
    }

    interface File {
        webkitRelativePath: string;
    }
}

export {}