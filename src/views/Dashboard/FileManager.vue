<template>
  <div class="row">
    <file-manager />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FileManager from "@/components/FileManager/FileManager.vue";

export default defineComponent({
  components: { FileManager },
  setup() {
    //
  },
});
</script>
