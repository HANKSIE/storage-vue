<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      :label="node.text"
      @click="cd(node.path)"
      v-for="(node, i) in breadcrumbNodes"
      :key="i"
    />
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from "vue";
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
    const { nodes } = toRefs(props);

    const cd = (dir: string) => {
      emit("changeDir", dir);
    };
    return {
      breadcrumbNodes: nodes,
      cd,
    };
  },
});
</script>

<style>
</style>