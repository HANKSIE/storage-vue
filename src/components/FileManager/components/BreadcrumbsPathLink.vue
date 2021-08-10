<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      @click="cd(node.path)"
      v-for="(node, i) in nodes"
      :key="i"
    >
      <link-text>{{ node.text }}</link-text>
    </q-breadcrumbs-el>
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PwdBreadCrumbNode } from "../composition/pwd";
import LinkText from "./LinkText.vue";

export default defineComponent({
  components: { LinkText },
  emits: ["changeDir"],
  props: {
    nodes: {
      type: Object as PropType<PwdBreadCrumbNode[]>,
      require: true,
    },
  },
  setup(props, { emit }) {
    const cd = (dir: string) => {
      emit("changeDir", dir);
    };
    return {
      cd,
    };
  },
});
</script>

<style>
</style>