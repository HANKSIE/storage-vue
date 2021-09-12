<template>
  <q-toolbar-title class="hover-cursor-text" @click="intentHome">
    Storage Box
  </q-toolbar-title>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const intentHome = () => router.push({ name: "home" });
    return {
      intentHome,
    };
  },
});
</script>
<style scoped>
.hover-cursor-text:hover {
  cursor: pointer;
}
</style>