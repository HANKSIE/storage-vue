interface FileGroup {
    [rootItem: string]: {
        files: File[],
        paths: string[]
    }
}

export default FileGroup;