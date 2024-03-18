<template>
  <div class="w-full h-full flex justify-center items-center">
    <img class="absolute -z-10 w-full h-full object-cover" src="/img/employer.avif" />
    <Login v-if="state === LoginRegister.Login" @go-to-register="state = LoginRegister.Register" />
    <Register v-else @go-to-login="state = LoginRegister.Login" />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
const state = ref(LoginRegister.Login)
</script>

<script lang="tsx">
const enum LoginRegister {
  Login,
  Register
}
</script>
