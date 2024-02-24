<template>
  <div class="w-full h-full flex justify-end items-center">
    <NCarousel :autoplay="true" :show-dots="false" class="absolute -z-10">
      <img src="/img/login-bg/1.avif" class="w-full h-full" />
      <img src="/img/login-bg/2.avif" class="w-full h-full" />
      <img src="/img/login-bg/3.avif" class="w-full h-full" />
    </NCarousel>
    <NCard
      class="w-fit h-fit m-12 shadow-2xl"
      header-style="font-size: 1rem; line-height: 1.75rem;"
    >
      <template #header>
        <div class="flex justify-center">欢迎来到个性化学习与职业规划系统</div>
      </template>
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
