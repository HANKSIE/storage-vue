import list from "./list";
import usePwd, { PwdRef } from "../composition/pwd";
import { FileInfosRef } from "../composition/fileInfos";
import ListData from "../type/request/ListData";

const { setPwdByPath } = usePwd();

const cd = async (pwdRef: PwdRef, refFileInfos: FileInfosRef, data: ListData): Promise<void> => {
    await list(refFileInfos, data);
    setPwdByPath(pwdRef, data.dir);
}

export default cd;