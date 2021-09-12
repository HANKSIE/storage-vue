<template>
  <q-btn
    flat
    round
    @click="$q.dark.toggle()"
    :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
  />
</template>
<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const $q = useQuasar();
    return {
      $q,
    };
  },
});
</script>