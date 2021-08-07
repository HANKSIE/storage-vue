import PathHelper from "@/components/FileManager/utils/path";
import { ref, Ref, computed, ComputedRef } from "vue";

type Pwd = string[];

type RefPwd = Ref<Pwd>;

type RefPwdStr = ComputedRef<string>;

type PwdBreadCrumbNode = {
    text: string;
    path: string;
}

const usePwd = () => {
    const pwd: RefPwd = ref<Pwd>([]);
    const pwdStr: RefPwdStr = computed(() => "/" + pwd.value.join("/") + (pwd.value.length > 0 ? "/": ""));
    
    const setPwdByPath = (pwd: RefPwd, path: string) => {
        path = PathHelper.format(path);
        pwd.value = path.split("/").filter((el) => !!el);
    }

    const pwdBreadcrumbNodes = computed((): PwdBreadCrumbNode[] => {
        return [
          {
            text: "Files",
            path: "/",
          },
          ...pwd.value.map((dir: string, i: number): PwdBreadCrumbNode => {
            const path = "/" + pwd.value.slice(0, i + 1).join("/");
            return {
              text: dir,
              path,
            };
          }),
        ];
    });

    return {
        pwd,
        pwdStr,
        pwdBreadcrumbNodes,
        setPwdByPath,
    }
}

export default usePwd;

export { Pwd, RefPwd, RefPwdStr, PwdBreadCrumbNode }