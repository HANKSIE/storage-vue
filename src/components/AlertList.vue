<template>
  <div class="q-py-sm" v-for="(message, i) in messages" :key="i">
    <alert>{{ message }}</alert>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Alert from "./Alert.vue";

export default defineComponent({
  components: { Alert },
  props: {
    messages: Object as PropType<string[]>,
  },
});
</script>