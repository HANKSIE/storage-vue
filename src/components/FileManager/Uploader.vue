<template>
  <div>
    <input
      type="file"
      ref="upload"
      class="d-none"
      :webkitdirectory="config.type === 'folder'"
      :multiple="config.type === 'file'"
      @change="upload"
      :key="refreshKey"
    />
    <span @click="$refs.upload.click()">
      {{ config.text }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        /**
         * file: {type:"file", text, multiple}
         * folder: {type:"folder", text}
         */
        return {
          type: "file",
          text: "file",
          multiple: true,
        };
      },
    },
  },
  data() {
    return {
      refreshKey: 0,
    };
  },
  methods: {
    upload(e) {
      const files = e.target.files;
      this.$emit("upload", files);
      this.clear();
    },
    clear() {
      this.refreshKey++; //get new file input (clear)
    },
  },
};
</script>