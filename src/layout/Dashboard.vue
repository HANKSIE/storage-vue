<template>
  <q-layout view="lHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="drawerToggle = !drawerToggle"
        />
        <q-toolbar-title> Storage Box </q-toolbar-title>
        <q-space />
        <q-btn @click="logout">logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import logout from "@/utils/action/logout";

export default defineComponent({
  setup() {
    return {
      logout,
    };
  },
});
</script>
