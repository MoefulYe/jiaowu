<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui/lib'
import LoginForm from '../components/login-form.vue'
import RegisterForm from '../components/register-form.vue'
</script>

<template>
  <div class="w-full h-full flex justify-center items-center">
    <NTabs animated class="w-fit h-fit">
      <NTabPane name="登录">
        <LoginForm />
      </NTabPane>
      <NTabPane name="注册">
        <RegisterForm />
      </NTabPane>
    </NTabs>
  </div>
</template>
