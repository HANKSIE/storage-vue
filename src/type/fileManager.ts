export interface FileInfo {
    name: string,
    mimeType: string,
    last_modified: string,
    size: string
}

export interface CopyMoveMemo {
    fromDir: string,
    toDir: string,
    exists: string[],
    action_selfs: string[],
    action: string,
}

export interface UploadMemo {
    rootItems: FileGroup,
    action: string,
    dir: string,
}

export interface FileGroup {
    [rootItem: string]: {
        files: File[],
        paths: string[]
    }
}