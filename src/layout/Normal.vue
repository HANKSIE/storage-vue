<template>
  <q-layout view="lHh lpR fFf">
    <q-header>
      <q-toolbar>
        <logo />
        <q-space />
        <theme-switch />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import Logo from "@/components/Logo.vue";

export default defineComponent({
  components: { ThemeSwitch, Logo },
});
</script>
