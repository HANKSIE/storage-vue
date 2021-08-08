<template>
  <input
    type="file"
    ref="refUpload"
    style="display: none"
    :webkitdirectory="type === 'folder'"
    :multiple="type === 'file' && multiple"
    @change="upload"
  />
  <span @click="refUpload.click()">{{ text }}</span>
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
    const refUpload = ref<HTMLInputElement>();

    const upload = () => {
      const files = (refUpload.value as HTMLInputElement).files;
      emit("upload", files);
    };

    return {
      refUpload,
      upload,
    };
  },
});
</script>