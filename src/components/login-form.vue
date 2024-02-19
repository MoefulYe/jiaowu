<template>
  <NButton class="w-full mt-4" @click="() => emit('register')">注册账号</NButton>
  <NDivider class="text-[#4c566a] opacity-90">或者</NDivider>
  <NForm ref="formRef" :label-width="80" :model="data" :rules="rules">
    <NFormItem label="手机号码" path="phone">
      <NInput v-model:value="data.phone" placeholder="请输入手机号码" />
    </NFormItem>
    <NFormItem label="密码" path="password">
      <NInput
        v-model:value="data.password"
        placeholder="请输入密码"
        type="password"
        show-password-on="click"
      />
    </NFormItem>
    <NButton type="primary" class="w-full mt-4" @click="click">登录</NButton>
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
import { ref, shallowRef } from 'vue'
import { useStateStore } from '../stores/user-state'
import { gotoHome } from '../router'
import { LoginData, login } from '../api/user/account'

const emit = defineEmits<{
  register: []
}>()

const data = ref<LoginData>({
  phone: '',
  password: ''
})
const formRef = shallowRef<FormInst>()

const click = async () => {
  try {
    await formRef.value!.validate()
    const token = await login(data.value)
    const state = useStateStore()
    state.username = `用户${data.value.phone}`
    state.login(token)
    gotoHome()
  } catch {
    // do nothing
  }
}

const rules: FormRules = {
  phone: [
    { required: true, message: '请输入手机号码' },
    {
      message: '手机号码不合法',
      trigger: 'blur',
      validator: (_, val: string) => {
        if (val !== '' && !/^\d{11}$/.test(val)) return new Error('手机号码必须是 11 位数字')
        return true
      }
    }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}
</script>
