<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      :label="node.text"
      @click="cd(node.path)"
      v-for="(node, i) in nodes"
      :key="i"
    />
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PwdBreadCrumbNode } from "../composition/pwd";

export default defineComponent({
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