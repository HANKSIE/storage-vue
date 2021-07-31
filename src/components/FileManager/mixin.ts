

// export default {
//   props: ["type", "id"],
//   data() {
//     return {
//       files: [],
//       selected: [],

//       pwd: [],

//       mkdirToggle: false,
//       mkdirName: "",

//       rules: {
//         uniqueFile: (value) => {
//           return (
//             this.files.filter((file) => file.name === value).length === 0 ||
//             "該路徑已有該檔案或資料夾"
//           );
//         },
//       },
//     };
//   },
//   methods: {

//     async ls(dir, only = 0) {
//       await this.$api.fileManager
//         .ls(this.type, this.id, dir, only)
//         .then((res) => {
//           const { items } = res.data;
//           this.files = items;
//           this.pwd = pathHelper.splitPathWithoutEmpty(dir);
//         })
//         .catch((err) => console.error(err));
//     },

//     concatPwdStr(dir) {
//       return `${this.pwdStr}${dir}`;
//     },

//     async mkdir(dir) {
//       let isSuccess = false;
//       await this.$api.fileManager
//         .mkdir(this.type, this.id, dir, this.mkdirName)
//         .then((res) => {
//           const { dir } = res.data;
//           this.files.unshift(dir);
//           isSuccess = true;
//           this.mkdirName = "";
//         })
//         .catch((err) => console.error(err));
      
//       return isSuccess;
//     },

//     async mkdirHandle() {
//       if (this.ruleValidate(this.rules.uniqueFile(this.mkdirName))) {
//         const isSuccess = await this.mkdir(this.pwdStr);
//         this.mkdirToggle = false;
//         return isSuccess;
//       }
//       return false;
//     },

//     ruleValidate(val) {
//       return !(typeof val === "string") && val;
//     },
//   },
//   computed: {
//     pwdStr() {
//       return "/" + this.pwd.join("/") + (this.pwd.length > 0 ? "/": "");
//     },
//     pwdBreadcrumbs() {
//       const root = "/";
//       return [
//         {
//           text: "Files",
//           path: root,
//         },
//         ...this.pwd.map((node, i) => {
//           const path = root + this.pwd.slice(0, i + 1).join("/");
//           return {
//             text: node,
//             path,
//           };
//         }),
//       ];
//     },
//   },
//   watch: {
//     mkdirToggle(val) {
//       if (!val) {
//         this.mkdirName = "";
//       }
//     },
//   },
// };

import { computed, defineComponent, ref, toRefs, watchEffect } from "vue";
import pathHelper from "@/utils/helper/path";
import { FileInfo } from "@/type/fileManager";
import api from "@/utils/api";

export default defineComponent({
  props: ["type", "id"],
  setup(props) {
    const { type, id } = toRefs(props);
    const files = ref<FileInfo[]>([]),
    selected = ref<FileInfo[]>([]),
    pwd = ref<string[]>([]),
    mkdirToggle = ref<boolean>(false),
    mkdirName = ref<string>(""),
    rules = {
      uniqueFile: (value: string): boolean|string => {
        return (
          files.value.filter((file: FileInfo) => file.name === value).length === 0 ||
          "該路徑已有該檔案或資料夾"
        );
      },
    };

    const ls = async(dir: string, only = 0): Promise<void> => {
        await api.fileManager
        .ls(type, id, dir, only)
        .then((res) => {
          const { items } = res.data;
          files.value = items;
          pwd.value = pathHelper.splitPathWithoutEmpty(dir);
        })
        .catch((err) => console.error(err));
    };

    const pwdStr = computed((): string => 
      ("/" + pwd.value.join("/") + (pwd.value.length > 0 ? "/": ""))
    );

    const concatPwdStr = (dir: string): string => {
      return `${pwdStr}${dir}`;
    };

    const mkdir = async (dir: string): Promise<boolean> => {
      let isSuccess = false;
      await api.fileManager
        .mkdir(type, id, dir, mkdirName.value)
        .then((res) => {
          const { dir } = res.data;
          files.value.unshift(dir);
          isSuccess = true;
          mkdirName.value = "";
        })
        .catch((err) => console.error(err));
      
      return isSuccess;
    };

    const ruleValidate = (val: any): boolean => !(typeof val === "string") && val;

    const mkdirHandle = async () => {
      if (ruleValidate(rules.uniqueFile(mkdirName.value))) {
        const isSuccess = await mkdir(pwdStr.value);
        mkdirToggle.value = false;
        return isSuccess;
      }
      return false;
    };

    const pwdBreadcrumbs = computed(()=>{
      const root = "/";
      return [
        {
          text: "Files",
          path: root,
        },
        ...pwd.value.map((node: string, i) => {
          const path = root + pwd.value.slice(0, i + 1).join("/");
          return {
            text: node,
            path,
          };
        }),
      ];
    });

    watchEffect(()=>{
      if (!mkdirToggle.value) {
        mkdirName.value = "";
      }
    });

    return {
      files,
      selected,
      pwd,
      mkdirToggle,
      mkdirName,
      rules,
      ls,
      pwdStr,
      concatPwdStr,
      mkdir,
      mkdirHandle,
      pwdBreadcrumbs,
    }
  }
});