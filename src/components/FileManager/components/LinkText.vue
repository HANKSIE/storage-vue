<template>
  <span class="link-text" @click="$emit('click')">
    <slot></slot>
  </span>
</template>
<style scoped>
.link-text:hover {
  transition-duration: 0.3s;
  text-decoration: underline;
  cursor: pointer;
}
</style>