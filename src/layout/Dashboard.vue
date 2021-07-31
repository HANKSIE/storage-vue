<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white glossy">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="drawerToggle = !drawerToggle"
        />
        <q-toolbar-title> Storage Space </q-toolbar-title>
        <q-spacer></q-spacer>
        <q-btn dense>logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="drawerToggle" side="left" bordered>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const drawerToggle = ref(true);

    return {
      drawerToggle,
    };
  },
});
</script>
