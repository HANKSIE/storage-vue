<template>
  <q-btn
    flat
    round
    @click="toggle"
    :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
  />
</template>
<script lang="ts">
import theme from "@/utils/localstorage/theme";
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const $q = useQuasar();

    const toggle = () => {
      $q.dark.toggle();
      theme.set($q.dark.isActive ? "dark" : "light");
    };

    return {
      $q,
      toggle,
    };
  },
});
</script>