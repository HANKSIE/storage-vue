<template>
  <q-layout view="lHh lpR fFf">
    <q-header>
      <q-toolbar>
        <logo />
        <q-space />
        <q-chip class="q-mx-md" :dark="false" icon="person">
          <span class="ellipsis" style="max-width: 150px">{{ user.name }}</span>
        </q-chip>
        <theme-switch />
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
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import Logo from "@/components/Logo.vue";

export default defineComponent({
  components: { ThemeSwitch, Logo },
  setup() {
    const { auth } = useStore();
    return {
      logout,
      user: auth.state.user,
    };
  },
});
</script>
