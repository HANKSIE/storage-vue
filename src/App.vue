<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import theme from "@/utils/localstorage/theme";
import { useQuasar } from "quasar";
export default defineComponent({
  setup() {
    const $q = useQuasar();

    if (!theme.value) {
      theme.set("light");
    }

    $q.dark.set(theme.value !== "light");
  },
});
</script>