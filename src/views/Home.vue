<template>
  <div class="row justify-center" style="margin: 20vh 0 10vh 0">
    <q-img src="@/assets/logo.png" width="12vw" class="q-mr-lg" />
    <h1 class="text-h3 text-italic">
      <span class="text-weight-bolder text-h2">Free</span> But
      <span class="text-weight-bolder text-h2">Not Permanent</span>
      Space
    </h1>
  </div>
  <div class="row justify-center">
    <q-btn class="text-weight-bolder text-h5" outline :to="{ name: 'login' }">
      Sign In
    </q-btn>
    <div class="q-mx-xl text-weight-bolder text-h5 row items-center">OR</div>
    <q-btn
      class="text-weight-bolder text-h5"
      outline
      :to="{ name: 'register' }"
    >
      Sign Up
    </q-btn>
  </div>
</template>