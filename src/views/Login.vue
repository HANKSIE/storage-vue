<template>
  <center-page>
    <q-form @submit.prevent="login" class="q-gutter-md">
      <q-input filled v-model="email" label="Email" type="email" />

      <q-input filled v-model="password" label="Password" type="password" />
      <div>
        還沒註冊嗎?
        <router-link :to="{ name: 'register' }"> 點我註冊 </router-link>
      </div>
      <div>
        <q-btn label="登入" type="submit" color="primary" />
      </div>
    </q-form>
  </center-page>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import authApi from "@/utils/api/auth";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import apiToken from "@/utils/token/apiToken";
import CenterPage from "@/components/CenterPage.vue";

export default defineComponent({
  components: { CenterPage },
  setup() {
    const router = useRouter();
    const { auth } = useStore();

    const email = ref<string>("iamfaker@gmail.com");
    const password = ref<string>("iamfaker");

    const login = async () => {
      try {
        const res = await authApi.login(email.value, password.value);
        const { token, user } = res.data;

        apiToken.set(token);

        auth.setUser(user);

        router.push({ name: "user_file" });
      } catch (err) {
        console.error(err);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
});
</script>