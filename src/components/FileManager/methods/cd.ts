import optionConfig from "../config/options";
import list from "./list";
import usePwd, { RefPwd } from "../composition/pwd";
import { RefFileInfos } from "../composition/fileInfos";

const { setPwdByPath } = usePwd();

const cd = async (pwd: RefPwd, refFileInfos: RefFileInfos, type: string, id: number, dir: string, options = optionConfig.LIST_ALL): Promise<void> => {
    await list(refFileInfos, type, id, dir, options);
    setPwdByPath(pwd, dir);
}

export default cd;