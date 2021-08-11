<template>
  <div class="row window-height row justify-center items-center">
    <div class="col-3">
      <q-form @submit.prevent="register">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h4 text-center">註冊</div>
          </q-card-section>
          <q-card-section>
            <q-input filled label="Name" name="name" v-model="name" />
          </q-card-section>
          <q-card-section>
            <q-input
              filled
              label="Email"
              type="email"
              name="email"
              v-model="email"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              filled
              label="Password"
              type="password"
              name="password"
              v-model="password"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              filled
              label="Confirm Password"
              type="password"
              name="password_confirmation"
              v-model="passwordConfirm"
            />
          </q-card-section>
          <q-card-actions align="center">
            <div class="col-3">
              <q-btn
                label="註冊"
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

export default defineComponent({
  setup() {
    const router = useRouter();
    const name = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const passwordConfirm = ref<string>("");

    const register = (e: Event) => {
      const formData = new FormData(e.target as HTMLFormElement);
      authApi
        .register(formData)
        .then(() => {
          router.push({ name: "login" });
        })
        .catch((err: Error) => {
          console.error(err);
        });
    };

    return {
      name,
      email,
      password,
      passwordConfirm,
      register,
    };
  },
});
</script>