<template>
  <q-toolbar class="text-primary">
    <!-- 新增資料夾 -->
    <q-btn flat label="新增資料夾" icon="add" @click="mkdir" />
    <template v-if="selectedFileInfos.length === 0">
      <!-- 上傳 -->
      <q-btn flat label="上傳" icon="upload" />
    </template>
    <template v-if="selectedFileInfos.length === 1">
      <!-- 重新命名 -->
      <q-btn
        flat
        label="重新命名"
        icon="drive_file_rename_outline"
        @click="rename"
      />
    </template>
    <template v-if="selectedFileInfos.length > 0">
      <!-- 下載 -->
      <q-btn flat label="下載" icon="download" @click="download" />
      <!-- 刪除 -->
      <q-btn flat label="刪除" icon="delete" @click="remove" />
      <!-- 移動 -->
      <q-btn
        flat
        label="移動"
        icon="drive_file_move"
        @click="openSecondaryFileManager"
      />
      <!-- 複製 -->
      <q-btn
        flat
        label="複製"
        icon="file_copy"
        @click="openSecondaryFileManager"
      />
    </template>
  </q-toolbar>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { Selected } from "../composition/selected";

export default defineComponent({
  emits: [
    "mkdir",
    "upload",
    "rename",
    "download",
    "remove",
    "openSecondaryFileManager",
  ],
  props: {
    selected: {
      type: Object as PropType<Selected>,
      require: true,
    },
  },
  setup(props, { emit }) {
    const { selected } = toRefs(props);

    const mkdir = (): void => emit("mkdir");
    const upload = (): void => emit("upload");
    const rename = (): void => emit("rename");
    const openSecondaryFileManager = (): void =>
      emit("openSecondaryFileManager");
    const remove = (): void => emit("remove");

    return {
      selectedFileInfos: selected,
      mkdir,
      upload,
      rename,
      openSecondaryFileManager,
      remove,
    };
  },
});
</script>