<template>
  <q-toolbar class="q-gutter-sm">
    <!-- 新增資料夾 -->
    <q-btn
      outline
      flat
      label="新增資料夾"
      icon="add"
      @click="openMkdirDialog"
    />
    <template v-if="selected.length === 0">
      <!-- 上傳 -->
      <q-btn-dropdown label="上傳" icon="upload" flat>
        <q-list>
          <q-item clickable>
            <q-item-section>
              <uploader type="file" text="檔案" multiple @upload="upload" />
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <uploader type="folder" text="資料夾" @upload="upload" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
    <template v-if="progressGroups.length > 0">
      <q-btn flat icon="error" @click="openProgressSideBar">
        <q-badge floating color="red" rounded />
      </q-btn>
    </template>
    <template v-if="selected.length > 0">
      <!-- 下載 -->
      <q-btn flat label="下載" icon="download" @click="download" />
      <!-- 刪除 -->
      <q-btn flat label="刪除" icon="delete" @click="openRemoveDialog" />
      <!-- 移動 -->
      <q-btn
        flat
        label="移動"
        icon="drive_file_move"
        @click="openDestChooserMove"
      />
      <!-- 複製 -->
      <q-btn flat label="複製" icon="file_copy" @click="openDestChooserCopy" />
    </template>
    <template v-if="selected.length === 1">
      <!-- 重新命名 -->
      <q-btn
        flat
        label="重新命名"
        icon="drive_file_rename_outline"
        @click="openRenameDialog"
      />
    </template>
  </q-toolbar>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Selected } from "../composition/selected";
import Uploader from "./Uploader.vue";
import MkdirDialog from "./dialog/Mkdir.vue";
import RenameDialog from "./dialog/Rename.vue";
import RemoveDialog from "./dialog/Remove.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  components: { Uploader },
  emits: [
    "mkdir",
    "upload",
    "rename",
    "download",
    "remove",
    "openDestChooserMove",
    "openDestChooserCopy",
    "openProgressSideBar",
  ],
  props: {
    selected: {
      type: Object as PropType<Selected>,
      require: true,
    },
    progressGroups: {
      type: Array,
      require: true,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();

    const openMkdirDialog = (): void => {
      $q.dialog({
        component: MkdirDialog,
      }).onOk((dirname: string) => {
        mkdir(dirname);
      });
    };

    const openRenameDialog = (): void => {
      $q.dialog({
        component: RenameDialog,
      }).onOk((filename: string) => {
        rename(filename);
      });
    };

    const openRemoveDialog = (): void => {
      $q.dialog({
        component: RemoveDialog,
      }).onOk(() => {
        remove();
      });
    };

    const openDestChooserMove = (): void => emit("openDestChooserMove");
    const openDestChooserCopy = (): void => emit("openDestChooserCopy");
    const openProgressSideBar = (): void => emit("openProgressSideBar");

    const mkdir = (dirname: string): void => emit("mkdir", dirname);
    const upload = (filePaths: string[], files: File[]): void =>
      emit("upload", filePaths, files);
    const rename = (filename: string): void => emit("rename", filename);
    const download = (): void => emit("download");

    const remove = (): void => emit("remove");

    return {
      openMkdirDialog,
      openRenameDialog,
      openRemoveDialog,
      mkdir,
      upload,
      rename,
      remove,
      download,
      openDestChooserMove,
      openDestChooserCopy,
      openProgressSideBar,
    };
  },
});
</script>