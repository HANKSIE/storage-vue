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
        <q-chip class="q-mx-md" :dark="false" icon="person">
          <span class="ellipsis" style="max-width: 150px">{{ user.name }}</span>
        </q-chip>
        <q-btn @click="logout" icon="logout" flat />
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
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const { auth } = useStore();
    return {
      logout,
      user: auth.state.user,
    };
  },
});
</script>
