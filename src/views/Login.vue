<template>
  <div class="row">
    <div class="col-6">
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
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "@/utils/api";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const router = useRouter();
    const { auth } = useStore();

    const email = ref<string>("iamfaker@gmail.com");
    const password = ref<string>("iamfaker");

    const login = async () => {
      try {
        const res = await api.auth.login(email.value, password.value);
        const { token, user } = res.data;

        localStorage.setItem("token", token);
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