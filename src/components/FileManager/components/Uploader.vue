<template>
  <input
    type="file"
    ref="uploadRef"
    style="display: none"
    :webkitdirectory="type === 'folder'"
    :multiple="type === 'file' && multiple"
    @change="upload"
  />
  <span @click="uploadRef.click()">{{ text }}</span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["upload"],
  props: {
    type: {
      type: String,
      default: "file",
    },
    text: {
      type: String,
      default: "file",
    },
    multiple: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const uploadRef = ref<HTMLInputElement>();

    const upload = () => {
      const fileList = (uploadRef.value as HTMLInputElement).files;
      const files = Array.from(fileList || []);

      const filePaths = files.map((f) => {
        return f.webkitRelativePath.length === 0
          ? `/${f.name}`
          : f.webkitRelativePath;
      });
      emit("upload", filePaths, files);
    };

    return {
      uploadRef,
      upload,
    };
  },
});
</script>