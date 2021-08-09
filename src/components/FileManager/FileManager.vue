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
            />
            <!-- 麵包屑導航 -->
            <bread-crumbs-navigate
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
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from "@vue/runtime-core";
import { columns } from "./config/widget";
import useFileInfos from "./composition/fileInfos";
import useSelected from "./composition/selected";
import usePwd from "./composition/pwd";

import BreadCrumbsNavigate from "./components/BreadCrumbsNavigate.vue";
import ToolBar from "./components/ToolBar.vue";
import RowData from "./components/RowData.vue";
import DropUploader from "./components/DropUploader.vue";

import list from "./methods/list";
import changeDir from "./methods/changeDir";
import remove from "./methods/remove";
import makedir from "./methods/makedir";
import uploadFiles from "./methods/upload";
import downloadFiles from "./methods/download";

import optionConfig from "./config/options";

export default defineComponent({
  components: { BreadCrumbsNavigate, ToolBar, RowData, DropUploader },
  props: {
    type: {
      type: String,
      require: true,
    },
    id: {
      type: Number,
      require: true,
    },
  },
  setup(props) {
    const { type, id } = toRefs(props);
    const { fileInfos } = useFileInfos();
    const { selected } = useSelected();
    const { pwd, pwdStr, pwdBreadcrumbNodes } = usePwd();

    onMounted(() => {
      list(fileInfos, {
        type: type.value!,
        id: id.value!,
        dir: pwdStr.value,
        options: optionConfig.LIST_ALL,
      });
    });

    const cd = (dir: string): void => {
      changeDir(pwd, fileInfos, {
        type: type.value!,
        id: id.value!,
        dir,
        options: optionConfig.LIST_ALL,
      });
    };

    const rm = (): void => {
      remove(fileInfos, selected, {
        type: type.value!,
        id: id.value!,
        dir: pwdStr.value,
        filenames: selected.value.map((info) => info.name),
      });
    };

    const mkdir = (filename: string): void => {
      makedir(fileInfos, {
        type: type.value!,
        id: id.value!,
        dir: pwdStr.value,
        filename,
      });
    };

    const download = (): void => {
      downloadFiles(selected, {
        type: type.value!,
        id: id.value!,
        dir: pwdStr.value,
        filenames: selected.value.map((info) => info.name),
      });
    };

    const upload = (filePaths: string[], files: File[]): void => {
      uploadFiles(fileInfos, {
        type: type.value!,
        id: id.value!,
        dir: pwdStr.value,
        filePaths,
        files,
        options: optionConfig.OVERRIDE_NONE,
      });
    };

    return {
      columns,
      fileInfos,
      selected,
      pwdBreadcrumbNodes,
      pwdStr,
      cd,
      rm,
      mkdir,
      upload,
      download,
    };
  },
});
</script>

<style>
</style>