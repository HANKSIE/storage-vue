import PathHelper from "@/utils/helper/path";
import { ref, computed } from "vue";

type BreadCrumbNode = {
    text: string;
    path: string;
}

const usePwd = () => {
    const pwd = ref<string[]>([]);
    const pwdStr = computed(() => "/" + pwd.value.join("/") + (pwd.value.length > 0 ? "/": ""));
    const setPwdByPath = (path: string) => {
        path = PathHelper.format(path);
        pwd.value = path.split("/").filter((el) => !!el);
    }

    const pwdBreadcrumbNodes = computed((): BreadCrumbNode[] => {
        return [
          {
            text: "Files",
            path: "/",
          },
          ...pwd.value.map((dir: string, i: number): BreadCrumbNode => {
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