<template>
  <NButton class="w-full mt-4" @click="() => emit('login')">登录账号</NButton>
  <NDivider class="text-[#4c566a] opacity-90 text-sm">或者</NDivider>
  <NForm ref="formRef" :label-width="80" :model="data" :rules="rules">
    <NFormItem label="手机" path="phone">
      <NInput v-model:value="data.phone" placeholder="请输入手机" />
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
import {
  NDivider,
  type FormInst,
  type FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput
} from 'naive-ui'
import { ref, shallowRef } from 'vue'
import { Role, useStateStore } from 'stores/user-state'
import { type RegisterData, register } from 'api/user/account'

const emit = defineEmits<{
  login: []
  success: []
}>()

interface ConfirmPassword {
  password2: string
}

const data = ref<RegisterData & ConfirmPassword>({
  phone: '',
  password: '',
  password2: ''
})

const formRef = shallowRef<FormInst>()
const click = async () => {
  try {
    await formRef.value!.validate()
    const token = await register(data.value)
    const state = useStateStore()
    state.login(token, Role.Employee)
    state.setUsername(`用户${data.value.phone}`)
    emit('success')
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
