<template>
  <NButton class="w-full mt-4" @click="() => emit('login')">登录账号</NButton>
  <NDivider class="text-[#4c566a] opacity-90">或者</NDivider>
  <NForm ref="formRef" :label-width="80" :model="data" :rules="rules">
    <NFormItem label="用户名" path="username">
      <NInput v-model:value="data.username" placeholder="请输入用户名" />
    </NFormItem>
    <NFormItem label="密码" path="password">
      <NInput
        v-model:value="data.password"
        placeholder="请输入密码"
        type="password"
        show-password-on="click"
      />
    </NFormItem>
    <NFormItem label="确认密码" path="password2">
      <NInput
        v-model:value="data.password2"
        placeholder="请再次输入密码"
        type="password"
        @keydown.enter="click"
      />
    </NFormItem>
    <NButton type="primary" class="w-full mt-4" @click="click">注册</NButton>
  </NForm>
</template>

<script setup lang="ts">
import { NDivider } from 'naive-ui'
import { type FormInst, type FormRules, NButton, NForm, NFormItem, NInput } from 'naive-ui/lib'
import { ref } from 'vue'
import { useStateStore } from '../stores/user-state'

const emit = defineEmits<{
  login: []
  success: []
}>()

const data = ref({
  username: '',
  password: '',
  password2: ''
})

const formRef = ref<FormInst | null>(null)
const click = () => {
  if (formRef.value) {
    formRef.value
      .validate((err) => {
        if (!err) {
          register()
        }
      })
      .catch(() => {
        window.$message.error('请检查表单!')
      })
  } else {
    window.$message.error('找不到表单实例!')
  }
}

const register = () => {
  if (data.value.username === 'wsy' && data.value.password === '123456') {
    useStateStore().login('asdasdsadfasfadfasdfasdfdasfdasf', data.value.username)
    emit('success')
  } else {
    window.$message.error('用户名或密码错误!')
  }
}

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  password2: [
    { required: true, message: '请再次输入密码' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    {
      validator: (_, value) => {
        if (value !== data.value.password) {
          return new Error('两次输入密码不一致')
        } else {
          return true
        }
      },
      trigger: ['blur', 'input']
    }
  ]
}
</script>
