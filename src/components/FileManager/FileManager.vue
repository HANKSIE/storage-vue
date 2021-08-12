<template>
  <drop-uploader @upload="upload" class="full-width">
    <div style="height: 500px">
      <q-table
        title="Treats"
        :rows="fileInfos"
        :columns="columns"
        row-key="name"
        selection="multiple"
        v-model:selected="selected"
        class="full-height scroll"
        :loading="loading"
      >
        <template v-slot:top>
          <!-- 工具列 -->
          <tool-bar
            class="q-mb-md"
            :selected="selected"
            :progressGroups="progressSideBar.groups"
            @remove="rm"
            @mkdir="mkdir"
            @rename="rename"
            @upload="upload"
            @download="download"
            @openDestChooserMove="openDestChooserMove"
            @openDestChooserCopy="openDestChooserCopy"
            @openProgressSideBar="openProgressSideBar"
          />
          <!-- 麵包屑導航 -->
          <breadcrumbs-path-link :nodes="pwdBreadcrumbNodes" @changeDir="cd" />
        </template>
        <template v-slot:body="props">
          <row-data @changeDir="cd" :properties="props" :pwdStr="pwdStr" />
        </template>
        <template v-slot:loading>
          <q-inner-loading showing>
            <q-spinner-ios size="50px" color="primary" />
          </q-inner-loading>
        </template>
      </q-table>
    </div>
  </drop-uploader>
  <q-drawer
    v-model="destChooser.toggle"
    behavior="mobile"
    overlay
    side="right"
    bordered
  >
    <destination-chooser
      :api="api"
      :actionText="destChooser.text"
      :toggle="destChooser.toggle"
      @handle="destChooser.handle"
      @mkdirHook="mkdirHook"
    />
  </q-drawer>
  <q-drawer
    v-model="progressSideBar.toggle"
    behavior="mobile"
    overlay
    side="right"
    bordered
  >
    <progress-bar :groups="progressSideBar.groups" @removeGroup="removeGroup" />
  </q-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
} from "@vue/runtime-core";
import { columns } from "./config/widget";
import useFileInfos from "./composition/fileInfos";
import useSelected from "./composition/selected";
import usePwd from "./composition/pwd";
import useLoading from "./composition/loading";

import BreadcrumbsPathLink from "./components/BreadcrumbsPathLink.vue";

import ToolBar from "./components/ToolBar.vue";
import RowData from "./components/RowData.vue";
import DropUploader from "./components/DropUploader.vue";
import DestinationChooser from "./components/chooser/DestinationChooser.vue";
import ProgressBar from "./components/ProgressBar.vue";

import optionConfig from "./config/options";
import Api from "./type/api";
import FileInfo from "./type/fileInfo";
import CopyMoveRecord from "./type/ProgressRecord/CopyMove/ExistRecord";
import SelfRecord from "./type/ProgressRecord/CopyMove/SelfRecord";
import CopyMoveRecordGroup, {
  KeepBothRelaceFunc as CopyMoveFunc,
} from "./type/ProgressRecord/CopyMove/RecordGroup";
import UploadRecordGroup, {
  KeepBothRelaceFunc as UploadFunc,
} from "./type/ProgressRecord/Upload/RecordGroup";
import ExistRecord from "./type/ProgressRecord/CopyMove/ExistRecord";
import UploadRecord from "./type/ProgressRecord/Upload/UploadRecord";

import getUploadRecords from "./utils/getUploadRecords";
import { useQuasar } from "quasar";

type DestChooserHandle = (toDir: string) => Promise<void>;

type DestChooserProps = {
  toggle: boolean;
  text: string;
  handle: DestChooserHandle | null;
};

type ProgressSideBarProps = {
  toggle: boolean;
  groups: (CopyMoveRecordGroup | UploadRecordGroup)[];
};

export default defineComponent({
  components: {
    BreadcrumbsPathLink,
    ToolBar,
    RowData,
    DropUploader,
    DestinationChooser,
    ProgressBar,
  },
  props: {
    api: {
      type: Object as PropType<Api>,
    },
  },
  setup(props) {
    const api = props.api as Api;

    const {
      fileInfos,
      setFileInfos,
      removeFileInfos,
      addFileInfos,
      getFileInfos,
      replaceFileInfo,
    } = useFileInfos();

    const { selected, clearSelected } = useSelected();
    const { pwdStr, pwdBreadcrumbNodes, setPwdByPath } = usePwd();
    const { loading, loadingFunc } = useLoading();
    const $q = useQuasar();

    const destChooserProps: DestChooserProps = {
      toggle: false,
      text: "",
      handle: null,
    };

    const progressSideBar: ProgressSideBarProps = reactive({
      toggle: false,
      groups: [],
    });

    const destChooser = reactive(destChooserProps);

    onMounted(() => {
      list(pwdStr.value);
    });

    const list = loadingFunc(async (dir: string): Promise<void> => {
      try {
        const res = await api.list({
          dir,
          options: optionConfig.LIST_ALL,
        });
        const { fileInfos } = res.data;
        setFileInfos(fileInfos);
      } catch (err) {
        console.error(err);
      }
    });

    const cd = async (dir: string): Promise<void> => {
      try {
        await list(dir);
        setPwdByPath(dir);
        clearSelected();
      } catch (err) {
        console.error(err);
      }
    };

    const rm = loadingFunc(async (): Promise<void> => {
      try {
        const res = await api.remove({
          dir: pwdStr.value,
          filenames: selected.value.map((info) => info.name),
        });
        const { successes } = res.data;

        removeFileInfos(successes);

        clearSelected();
      } catch (err) {
        console.error(err);
      }
    });

    const mkdir = loadingFunc(async (filename: string): Promise<void> => {
      try {
        const res = await api.mkdir({
          dir: pwdStr.value,
          filename,
        });
        const { fileInfo, isSuccess, exist } = res.data;

        if (fileInfo) {
          addFileInfos([fileInfo]);
        } else if (exist) {
          $q.notify({
            message: "該位置已有同名檔案",
            icon: "warning_amber",
            position: "top-right",
          });
        } else if (!isSuccess) {
          $q.notify({
            message: "資料夾創建失敗",
            icon: "warning_amber",
            position: "top-right",
          });
        }
      } catch (err) {
        console.error(err);
      }
    });

    const rename = loadingFunc(async (newFileName: string): Promise<void> => {
      try {
        const oldFileName = selected.value[0].name;
        const res = await api.rename({
          dir: pwdStr.value,
          oldFileName,
          newFileName,
        });

        const { fileInfo, isSuccess, exist } = res.data;
        if (fileInfo) {
          replaceFileInfo(oldFileName, fileInfo);
          clearSelected();
        } else if (exist) {
          $q.notify({
            message: "該位置已有同名檔案",
            icon: "warning_amber",
            position: "top-right",
          });
        } else if (isSuccess) {
          $q.notify({
            message: "重新命名失敗",
            icon: "warning_amber",
            position: "top-right",
          });
        }
      } catch (err) {
        console.error(err);
      }
    });

    const download = loadingFunc(async (): Promise<void> => {
      try {
        const res = await api.download({
          dir: pwdStr.value,
          filenames: selected.value.map((info) => info.name),
        });

        const contentDisposition = res.headers["content-disposition"];
        const matchUTF8 = contentDisposition.match(/filename\*=utf-8''(.+)/);
        const match = contentDisposition.match(/filename=(.+)/);
        const filename = matchUTF8
          ? decodeURIComponent(matchUTF8[1])
          : match[1];

        const a = document.createElement("a");
        const url = window.URL.createObjectURL(res.data);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        clearSelected();
      } catch (err) {
        console.error(err);
      }
    });

    const upload = loadingFunc(
      async (filePaths: string[], files: File[]): Promise<void> => {
        try {
          const dir = pwdStr.value;
          const res = await api.upload({
            dir,
            filePaths,
            files,
            options: optionConfig.OVERRIDE_NONE,
          });
          const { fileInfos, exists } = res.data;

          addFileInfos(fileInfos);

          if (exists.length > 0) {
            const records = getUploadRecords(exists, dir, filePaths, files);
            const group = new UploadRecordGroup(
              "upload",
              records,
              uploadKeepBothReplace(true),
              uploadKeepBothReplace(false)
            );
            progressSideBar.groups.unshift(group);
          }
        } catch (err) {
          console.error(err);
        }
      }
    );

    const uploadKeepBothReplace = (isKeepBoth: boolean): UploadFunc =>
      loadingFunc(
        async (
          group: UploadRecordGroup,
          record: UploadRecord,
          dir: string,
          filePaths: string[],
          files: File[]
        ) => {
          try {
            const res = await api.upload({
              dir,
              filePaths,
              files,
              options: isKeepBoth
                ? optionConfig.OVERRIDE_KEEPBOTH
                : optionConfig.OVERRIDE_REPLACE,
            });
            const { fileInfos } = res.data;

            if (pwdStr.value === dir) {
              //replace
              if (!isKeepBoth) {
                removeFileInfos(fileInfos.map((info) => info.name));
              }
              //keepBoth & replace
              addFileInfos(fileInfos);
            }

            group.records = group.records.filter((r) => r !== record);
            const { records } = group;
            //record count is 0
            if (records.length === 0) {
              //remove group
              progressSideBar.groups = progressSideBar.groups.filter(
                (g) => g !== group
              );
            }
          } catch (err) {
            console.error(err);
          }
        }
      );

    const copyMove = (isCopy: boolean) =>
      loadingFunc(async (toDir: string): Promise<void> => {
        try {
          const fromDir = pwdStr.value;

          if (fromDir === toDir && !isCopy) {
            return;
          }

          const payload = {
            fromDir,
            toDir,
            filenames: selected.value.map((info) => info.name),
            options: optionConfig.OVERRIDE_NONE,
          };
          const res = await (isCopy ? api.copy(payload) : api.move(payload));

          const { fileInfos, exists, selfs } = res.data;

          if (fromDir !== toDir && !isCopy) {
            removeFileInfos(fileInfos.map((info) => info.name));
          }

          if (exists.length > 0 || selfs.length > 0) {
            const existFileInfos = getFileInfos(exists);
            const selfFileInfos = getFileInfos(selfs);

            const existRecords: CopyMoveRecord[] = existFileInfos.map(
              (info) => ({
                fromDir,
                toDir,
                fileInfo: info,
              })
            );

            const selfRecords: SelfRecord[] = selfFileInfos.map((info) => ({
              fileInfo: info,
            }));

            const group = new CopyMoveRecordGroup(
              isCopy ? "copy" : "move",
              existRecords,
              selfRecords,
              copyMoveKeepBothReplace(isCopy, true),
              copyMoveKeepBothReplace(isCopy, false)
            );

            progressSideBar.groups.unshift(group);
          }
          clearSelected();
          destChooser.toggle = false;
        } catch (err) {
          console.error(err);
        }
      });

    const copyMoveKeepBothReplace = (
      isCopy: boolean,
      isKeepBoth: boolean
    ): CopyMoveFunc =>
      loadingFunc(
        async (
          group: CopyMoveRecordGroup,
          record: ExistRecord | SelfRecord,
          fromDir: string,
          toDir: string,
          filename: string
        ) => {
          try {
            const payload = {
              fromDir,
              toDir,
              filenames: [filename],
              options: isKeepBoth
                ? optionConfig.OVERRIDE_KEEPBOTH
                : optionConfig.OVERRIDE_REPLACE,
            };
            const res = await (isCopy ? api.copy(payload) : api.move(payload));

            const { fileInfos, notExists } = res.data;

            if (notExists.length > 0) {
              console.log(notExists[0], "不存在");
            }

            if (pwdStr.value === toDir) {
              //replace
              if (!isKeepBoth) {
                removeFileInfos(fileInfos.map((info) => info.name));
              }
              //keepBoth & replace
              addFileInfos(fileInfos);
            }

            group.existRecords = group.existRecords.filter((r) => r !== record);
            const { existRecords, selfRecords } = group;
            //record count is 0
            if (existRecords.length + selfRecords.length === 0) {
              //remove group
              progressSideBar.groups = progressSideBar.groups.filter(
                (g) => g !== group
              );
            }
          } catch (err) {
            console.error(err);
          }
        }
      );

    const move: DestChooserHandle = copyMove(false);
    const copy: DestChooserHandle = copyMove(true);

    const mkdirHook = (chooserPwdStr: string, info: FileInfo): void => {
      if (chooserPwdStr === pwdStr.value) {
        addFileInfos([info]);
      }
    };

    const openDestChooserMove = () => {
      destChooser.text = "Move Here";
      destChooser.handle = move;
      destChooser.toggle = true;
    };

    const openDestChooserCopy = () => {
      destChooser.text = "Copy Here";
      destChooser.handle = copy;
      destChooser.toggle = true;
    };

    const openProgressSideBar = () => {
      progressSideBar.toggle = true;
    };

    const removeGroup = (group: CopyMoveRecordGroup | UploadRecordGroup) => {
      progressSideBar.groups = progressSideBar.groups.filter(
        (g) => g !== group
      );
    };

    return {
      columns,
      fileInfos,
      selected,
      pwdBreadcrumbNodes,
      pwdStr,
      destChooser,
      progressSideBar,
      cd,
      rm,
      mkdir,
      rename,
      upload,
      download,
      mkdirHook,
      openDestChooserMove,
      openDestChooserCopy,
      openProgressSideBar,
      removeGroup,
      loading,
    };
  },
});
</script>

<style>
</style>