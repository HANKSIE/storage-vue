<template>
  <div class="row q-pa-md full-width">
    <file-manager :api="fileManagerApi" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FileManager from "@/components/FileManager/FileManager.vue";
import { useStore } from "@/store";
import FileManagerApi from "@/utils/api/filemanager";
export default defineComponent({
  components: { FileManager },
  setup() {
    const { auth } = useStore();
    const fileManagerApi = new FileManagerApi(`user/${auth.state.user?.id}`);
    return {
      fileManagerApi,
    };
  },
});
</script>
