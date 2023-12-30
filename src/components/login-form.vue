<template>
  <NButton class="w-full mt-4" @click="() => emit('register')">注册账号</NButton>
  <NDivider class="text-[#4c566a] opacity-90">或者</NDivider>
  <NForm ref="formRef" :label-width="80" :model="data" :rules="rules">
    <NFormItem label="用户名" path="username">
      <NInput v-model:value="data.username" placeholder="请输入用户名" />
    </NFormItem>
    <NFormItem label="密码" path="password">
      <NInput v-model:value="data.password" placeholder="请输入密码" />
    </NFormItem>
    <NButton
      type="primary"
      class="w-full mt-4"
      @click="
        () => {
          console.log(data)
        }
      "
      >登录</NButton
    >
  </NForm>
</template>

<script setup lang="ts">
import {
  type FormInst,
  type FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NDivider
} from 'naive-ui/lib'
import { ref } from 'vue'

const emit = defineEmits<{
  register: []
}>()

const data = ref({
  username: '',
  password: ''
})

const formRef = ref<FormInst | null>(null)

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}
</script>
