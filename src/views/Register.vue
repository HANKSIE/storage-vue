<template>
  <div class="row">
    <div class="col-6">
      <q-form @submit.prevent="register" class="q-gutter-md">
        <q-input filled label="Name" name="name" v-model="name" />
        <q-input
          filled
          label="Email"
          type="email"
          name="email"
          v-model="email"
        />
        <q-input
          filled
          label="Password"
          type="password"
          name="password"
          v-model="password"
        />
        <q-input
          filled
          label="Confirm Password"
          type="password"
          name="password_confirmation"
          v-model="passwordConfirm"
        />
        <q-file accept="image/*" label="頭像" name="avatar" v-model="avatar" />
        <div>
          <q-btn label="註冊" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import api from "@/utils/api";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const name = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const passwordConfirm = ref<string>("");
    const avatar = ref<File | null>(null);

    const register = (e: Event) => {
      const formData = new FormData(e.target as HTMLFormElement);
      api.auth
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
      avatar,
      register,
    };
  },
});
</script>