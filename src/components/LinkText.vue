<template>
  <span class="link-text" @click="click">
    <slot></slot>
  </span>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { RouteLocationRaw, useRouter } from "vue-router";

export default defineComponent({
  emits: ["click"],
  props: {
    to: Object as PropType<RouteLocationRaw>,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const { to } = toRefs(props);
    const click = () => {
      if (to.value) {
        router.push(to.value as RouteLocationRaw);
      }
      emit("click");
    };
    return {
      click,
    };
  },
});
</script>
<style scoped>
.link-text {
  text-decoration: underline;
  cursor: pointer;
}
</style>