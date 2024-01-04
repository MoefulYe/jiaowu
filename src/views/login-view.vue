<template>
  <div class="w-full h-full flex justify-end items-center">
    <NCarousel :autoplay="true" :show-dots="false" class="absolute -z-10">
      <img src="/login-bg/bg_01.jpg" class="w-full h-full" />
      <img src="/login-bg/bg_02.jpg" class="w-full h-full" />
      <img src="/login-bg/bg_03.jpg" class="w-full h-full" />
    </NCarousel>
    <NCard
      class="w-fit h-fit m-12 shadow-2xl"
      header-style="font-size: 1rem; line-height: 1.75rem;"
    >
      <template #header> 欢迎来到个性化学习与职业规划系统 </template>
      <template #default>
        <LoginForm @register="gotoRegister" />
      </template>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NCarousel } from 'naive-ui'
import LoginForm from '../components/login-form.vue'
import { gotoRegister } from '../router'
</script>
