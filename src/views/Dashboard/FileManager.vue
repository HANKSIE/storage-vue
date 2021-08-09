<template>
  <div class="row q-pa-md full-width">
    <file-manager :type="type" :id="id" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FileManager from "@/components/FileManager/FileManager.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: { FileManager },
  setup() {
    const { auth } = useStore();

    return {
      type: "user",
      id: auth.state.user?.id,
    };
  },
});
</script>
