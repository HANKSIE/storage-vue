<template>
  <div @drop="dropHandler" @dragover="dragOverHandler">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import dropFileData from "../utils/dropFileDatas";

export default defineComponent({
  emits: ["upload"],
  setup(props, { emit }) {
    const dragOverHandler = (e: Event): void => e.preventDefault();

    // Drop handler function to get all files
    const dropHandler = async (e: DragEvent) => {
      e.preventDefault();
      const dataTransferItemList = e.dataTransfer?.items;

      if (dataTransferItemList) {
        const { files, filePaths } = await dropFileData(dataTransferItemList);
        emit("upload", filePaths, files);
      }
    };

    return {
      dragOverHandler,
      dropHandler,
    };
  },
});
</script>