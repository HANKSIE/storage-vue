<template>
  <div class="row window-height row justify-center items-center">
    <q-form @submit.prevent="register">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">註冊</div>
        </q-card-section>
        <q-card-section>
          <alert-list :messages="errorMessages" />
        </q-card-section>
        <q-card-section>
          <q-input filled label="Name" name="name" v-model="name">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            label="Email"
            type="email"
            name="email"
            v-model="email"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            label="Password"
            type="password"
            name="password"
            v-model="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            v-model="passwordConfirm"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="center">
          <div class="col-3 q-mb-md">
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
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import authApi from "@/utils/api/auth";
import { useRouter } from "vue-router";
import useResponseErrorMessage from "@/composition/responseErrorMessage";
import AlertList from "@/components/AlertList.vue";

export default defineComponent({
  components: { AlertList },
  setup() {
    const router = useRouter();
    const name = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const passwordConfirm = ref<string>("");

    const { errorMessages, setErrorMessages, clearErrorMessages } =
      useResponseErrorMessage();

    const register = (e: Event) => {
      const formData = new FormData(e.target as HTMLFormElement);
      authApi
        .register(formData)
        .then(() => {
          router.push({ name: "login" });
        })
        .catch((err: Error) => {
          clearErrorMessages();
          console.error(err);
          setErrorMessages(err);
        });
    };

    return {
      name,
      email,
      password,
      passwordConfirm,
      register,
      errorMessages,
    };
  },
});
</script>