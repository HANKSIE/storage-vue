<template>
  <drop-uploader @upload="upload" class="full-width">
    <div class="row justify-center">
      <div class="col-10" style="height: 500px">
        <q-table
          title="Treats"
          :rows="fileInfos"
          :columns="columns"
          row-key="name"
          selection="multiple"
          v-model:selected="selected"
          class="full-height scroll"
        >
          <template v-slot:top>
            <!-- 工具列 -->
            <tool-bar
              :selected="selected"
              @remove="rm"
              @mkdir="mkdir"
              @upload="upload"
              @download="download"
              @openDestChooserMove="openDestChooserMove"
              @openDestChooserCopy="openDestChooserCopy"
            />
            <!-- 麵包屑導航 -->
            <breadcrumbs-path-link
              :nodes="pwdBreadcrumbNodes"
              @changeDir="cd"
            />
          </template>
          <template v-slot:body="props">
            <row-data @changeDir="cd" :properties="props" :pwdStr="pwdStr" />
          </template>
        </q-table>
      </div>
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
      @handle="destChooser.handle"
    />
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

import BreadcrumbsPathLink from "./components/BreadcrumbsPathLink.vue";

import ToolBar from "./components/ToolBar.vue";
import RowData from "./components/RowData.vue";
import DropUploader from "./components/DropUploader.vue";
import DestinationChooser from "./components/chooser/DestinationChooser.vue";

import optionConfig from "./config/options";
import Api from "./type/api";

export default defineComponent({
  components: {
    BreadcrumbsPathLink,
    ToolBar,
    RowData,
    DropUploader,
    DestinationChooser,
  },
  props: {
    api: {
      type: Object as PropType<Api>,
    },
  },
  setup(props) {
    const api = props.api as Api;
    const { fileInfos, setFileInfos, removeFileInfos, addFileInfos } =
      useFileInfos();
    const { selected, clearSelected } = useSelected();
    const { pwdStr, pwdBreadcrumbNodes, setPwdByPath } = usePwd();
    const destChooser = reactive({
      toggle: false,
      text: "",
      handle: (): void => {
        //
      },
    });

    onMounted(() => {
      list(pwdStr.value);
    });

    const list = async (dir: string): Promise<void> => {
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
    };

    const cd = async (dir: string): Promise<void> => {
      try {
        await list(dir);
        setPwdByPath(dir);
      } catch (err) {
        console.error(err);
      }
    };

    const rm = async (): Promise<void> => {
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
    };

    const mkdir = async (filename: string): Promise<void> => {
      try {
        const res = await api.mkdir({
          dir: pwdStr.value,
          filename,
        });
        const { fileInfo, isSuccess, exist } = res.data;

        if (fileInfo) {
          addFileInfos([fileInfo]);
        } else if (!isSuccess) {
          console.log("創建失敗");
        } else if (exist) {
          console.log("檔案已存在: ", exist);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const download = async (): Promise<void> => {
      try {
        const res = await api.download({
          dir: pwdStr.value,
          filenames: selected.value.map((info) => info.name),
        });
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(res.data);
        a.href = url;
        const contentDisposition = res.headers["content-disposition"];
        const filename = contentDisposition.match(/filename=(.+)/)[1];
        a.download = decodeURIComponent(filename);
        a.click();
        window.URL.revokeObjectURL(url);
        clearSelected();
      } catch (err) {
        console.error(err);
      }
    };

    const upload = async (
      filePaths: string[],
      files: File[]
    ): Promise<void> => {
      try {
        const res = await api.upload({
          dir: pwdStr.value,
          filePaths,
          files,
          options: optionConfig.OVERRIDE_NONE,
        });
        const { fileInfos } = res.data;

        addFileInfos(fileInfos);

        //TODO add exists to progressGroups
      } catch (err) {
        console.error(err);
      }
    };

    const move = (): void => {
      //
    };

    const copy = (): void => {
      //
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

    return {
      columns,
      fileInfos,
      selected,
      pwdBreadcrumbNodes,
      pwdStr,
      destChooser,
      cd,
      rm,
      mkdir,
      upload,
      download,
      openDestChooserMove,
      openDestChooserCopy,
    };
  },
});
</script>

<style>
</style>