<template>
  <q-toolbar class="q-gutter-sm">
    <!-- 新增資料夾 -->
    <q-btn flat label="新增資料夾" icon="add" @click="openMkdirDialog" />
    <template v-if="selectedFileInfos.length === 0">
      <!-- 上傳 -->
      <q-btn-dropdown label="上傳" icon="upload">
        <q-list>
          <q-item clickable>
            <q-item-section>
              <uploader type="file" text="檔案" multiple />
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <uploader type="folder" text="資料夾" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
    <template v-if="selectedFileInfos.length === 1">
      <!-- 重新命名 -->
      <q-btn
        flat
        label="重新命名"
        icon="drive_file_rename_outline"
        @click="openRenameDialog"
      />
    </template>
    <template v-if="selectedFileInfos.length > 0">
      <!-- 下載 -->
      <q-btn flat label="下載" icon="download" />
      <!-- 刪除 -->
      <q-btn flat label="刪除" icon="delete" @click="openRemoveDialog" />
      <!-- 移動 -->
      <q-btn flat label="移動" icon="drive_file_move" />
      <!-- 複製 -->
      <q-btn flat label="複製" icon="file_copy" />
    </template>
  </q-toolbar>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { Selected } from "../composition/selected";
import Uploader from "./Uploader.vue";
import MkdirDialog from "./dialog/Mkdir.vue";
import RenameDialog from "./dialog/Rename.vue";
import RemoveDialog from "./dialog/Remove.vue";
import { useQuasar } from "quasar";

export default defineComponent({
  components: { Uploader },
  emits: ["mkdir", "upload", "rename", "download", "remove"],
  props: {
    selected: {
      type: Object as PropType<Selected>,
      require: true,
    },
    toggleSecondary: Boolean,
  },
  setup(props, { emit }) {
    const { selected } = toRefs(props);

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

    const mkdir = (dirname: string): void => emit("mkdir", dirname);
    const upload = (): void => emit("upload");
    const rename = (filename: string): void => emit("rename", filename);

    const remove = (): void => emit("remove");

    return {
      selectedFileInfos: selected,
      openMkdirDialog,
      openRenameDialog,
      openRemoveDialog,
      mkdir,
      upload,
      rename,
      remove,
    };
  },
});
</script>