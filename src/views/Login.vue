<template>
  <div class="row window-height row justify-center items-center">
    <q-form @submit.prevent="login">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">登入</div>
        </q-card-section>
        <q-card-section>
          <alert-list :messages="errorMessages" />
        </q-card-section>
        <q-card-section>
          <q-input filled v-model="email" label="Email" type="email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input filled v-model="password" label="Password" type="password">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
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
        <q-separator class="q-mt-sm" />
        <q-card-section class="row justify-center">
          還沒註冊嗎?
          <link-text :to="{ name: 'register' }">點我註冊</link-text>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import authApi from "@/utils/api/auth";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import apiToken from "@/utils/token/apiToken";
import LinkText from "@/components/LinkText.vue";
import AlertList from "@/components/AlertList.vue";
import useResponseErrorMessage from "@/composition/responseErrorMessage";

export default defineComponent({
  components: { LinkText, AlertList },
  setup() {
    const router = useRouter();
    const { auth } = useStore();

    const email = ref<string>("");
    const password = ref<string>("");
    const { errorMessages, setErrorMessages, clearErrorMessages } =
      useResponseErrorMessage();

    const login = async () => {
      try {
        const res = await authApi.login(email.value, password.value);
        const { token, user } = res.data;

        apiToken.set(token);

        auth.setUser(user);

        router.push({ name: "user_file" });
      } catch (err) {
        clearErrorMessages();
        console.error(err);
        setErrorMessages(err);
      }
    };

    return {
      email,
      password,
      login,
      errorMessages,
    };
  },
});
</script>