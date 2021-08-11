<template>
  <div class="row window-height row justify-center items-center">
    <div class="col-4">
      <q-form @submit.prevent="login">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h4 text-center">登入</div>
          </q-card-section>
          <q-card-section>
            <q-input filled v-model="email" label="Email" type="email" />
          </q-card-section>
          <q-card-section>
            <q-input
              filled
              v-model="password"
              label="Password"
              type="password"
            />
          </q-card-section>
          <q-card-section class="row justify-center">
            還沒註冊嗎?
            <router-link :to="{ name: 'register' }"> 點我註冊 </router-link>
          </q-card-section>
          <q-card-actions align="center">
            <div class="col-3">
              <q-btn
                label="登入"
                type="submit"
                color="primary"
                class="full-width"
              />
            </div>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import authApi from "@/utils/api/auth";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import apiToken from "@/utils/token/apiToken";

export default defineComponent({
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