<template>
  <div class="w-full h-full flex justify-end items-center">
    <NCarousel :autoplay="true" :show-dots="false" class="absolute -z-10">
      <img src="/login-bg/bg_01.jpg" class="w-full h-full" />
      <img src="/login-bg/bg_02.jpg" class="w-full h-full" />
      <img src="/login-bg/bg_03.jpg" class="w-full h-full" />
    </NCarousel>
    <NCard class="w-fit h-fit m-12 shadow-2xl">
      <template #header> 欢迎来到{{ TITLE }} </template>
      <template #default>
        <LoginForm v-if="state === Popup.Login" @register="() => (state = Popup.Register)" />
        <RegisterForm v-else-if="state === Popup.Register" @login="() => (state = Popup.Login)" />
      </template>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NCarousel } from 'naive-ui'
import LoginForm from '../components/login-form.vue'
import RegisterForm from '../components/register-form.vue'
import { TITLE } from '../constants'

enum Popup {
  Login,
  Register
}

const state = ref(Popup.Login)
</script>
