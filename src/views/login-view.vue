<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui/lib'
import LoginForm from '../components/login-form.vue'
import RegisterForm from '../components/register-form.vue'

const TITLE = import.meta.env.VITE_TITLE
</script>

<template>
  <h2>欢迎来到 {{ TITLE }}</h2>
  <div class="w-full h-full flex justify-center items-center -z-10" id="login-container">
    <NTabs animated class="w-fit h-fit bg-white p-8 shadow-md rounded-md">
      <NTabPane name="登录">
        <LoginForm />
      </NTabPane>
      <NTabPane name="注册">
        <RegisterForm />
      </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped lang="scss">
#login-container {
  background-image: url('/login-background.svg');
  background-size: cover;
  background-position: center;
}
</style>
