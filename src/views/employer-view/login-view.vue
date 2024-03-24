<template>
  <NCard class="w-fit shadow-lg">
    <template #header>
      <div class="flex justify-center">企业招聘人员登录</div>
    </template>
    <template #default>
      <NTooltip>
        <template #trigger>
          <NButton class="w-full" @click="gotoEmployeeLogin">我想要找工作</NButton>
        </template>
        <template #default> 点此登录或者注册求职者账号 </template>
      </NTooltip>
      <NDivider class="text-[#4c566a] opacity-90 text-sm">或者</NDivider>
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
      </NForm>
    </template>
    <template #footer>
      <div class="flex gap-2 justify-stretch">
        <NTooltip placement="bottom">
          <template #trigger>
            <NButton class="grow" @click="click">登录</NButton>
          </template>
          <template #default> 点此登录 </template>
        </NTooltip>
        <NTooltip placement="bottom">
          <template #trigger>
            <NButton class="grow" type="primary" @click="emit('register')">注册</NButton>
          </template>
          <template #default> 跳转到注册页面 </template>
        </NTooltip>
      </div>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import {
  type FormInst,
  type FormRules,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NDivider,
  NTooltip,
  NCard
} from 'naive-ui'
import { ref, shallowRef } from 'vue'
import { gotoEmployeeLogin, gotoHome } from '@/router'
import { type LoginData, login } from '@/api/employer/account'
import { Role, useStateStore } from '@/stores/user-state'

const emit = defineEmits<{
  register: []
}>()

const data = ref<Partial<LoginData>>({})
const formRef = shallowRef<FormInst>()

const click = async () => {
  try {
    await formRef.value!.validate()
    const token = await login(data.value as LoginData)
    const state = useStateStore()
    state.login(token, Role.Employer)
    state.setUsername(`招聘官${data.value.phone}`)
    gotoHome(state.role())
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
