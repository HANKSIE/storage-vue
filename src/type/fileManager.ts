export interface FileInfo {
    name: string,
    dir: string,
    mime: string,
    lastModified: string,
    size: string
}

export interface FileGroup {
    [rootItem: string]: {
        files: File[],
        paths: string[]
    }
}