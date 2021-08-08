<template>
  <q-toolbar class="q-gutter-sm">
    <!-- 新增資料夾 -->
    <q-btn
      flat
      label="新增資料夾"
      icon="add"
      @click="toggleMkdirDialog = true"
    />
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
        @click="toggleRenameDialog = true"
      />
    </template>
    <template v-if="selectedFileInfos.length > 0">
      <!-- 下載 -->
      <q-btn flat label="下載" icon="download" @click="download" />
      <!-- 刪除 -->
      <q-btn
        flat
        label="刪除"
        icon="delete"
        @click="toggleRemoveDialog = true"
      />
      <!-- 移動 -->
      <q-btn
        flat
        label="移動"
        icon="drive_file_move"
        @click="toggleSecondaryFileManager = true"
      />
      <!-- 複製 -->
      <q-btn
        flat
        label="複製"
        icon="file_copy"
        @click="toggleSecondaryFileManager = true"
      />
    </template>
  </q-toolbar>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from "vue";
import { Selected } from "../composition/selected";
import Uploader from "./Uploader.vue";

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

    const mkdir = (): void => emit("mkdir");
    const upload = (): void => emit("upload");
    const rename = (): void => emit("rename");

    const toggleSecondaryFileManager = ref<boolean>(false);
    const toggleRenameDialog = ref<boolean>(false);
    const toggleRemoveDialog = ref<boolean>(false);
    const toggleMkdirDialog = ref<boolean>(false);

    const remove = (): void => emit("remove");

    return {
      selectedFileInfos: selected,
      toggleSecondaryFileManager,
      toggleRenameDialog,
      toggleRemoveDialog,
      toggleMkdirDialog,
      mkdir,
      upload,
      rename,
      remove,
    };
  },
});
</script>