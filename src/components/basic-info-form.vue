<template>
  <NForm ref="formRef" :model="data" :rules="rules" class="p-2">
    <NFormItem label="学号" path="code">
      <NInput v-model:value="data.code" placeholder="输入学号" />
    </NFormItem>
    <NFormItem label="姓名" path="name">
      <NInput v-model:value="data.name" placeholder="输入姓名" />
    </NFormItem>
    <NFormItem label="性别" path="gender">
      <NRadioGroup v-model:value="data.gender">
        <NRadio :value="Gender.Female"> {{ Gender.Female }}</NRadio>
        <NRadio :value="Gender.Male"> {{ Gender.Male }}</NRadio>
      </NRadioGroup>
    </NFormItem>
    <NFormItem label="出生日期" path="birthday">
      <NDatePicker v-model:formattedValue="data.birthday" />
    </NFormItem>
    <NFormItem label="电话" path="phone">
      <NInput v-model:value="data.phone" placeholder="输入电话" />
    </NFormItem>
    <NFormItem label="邮箱" path="email">
      <NInput v-model:value="data.email" placeholder="输入邮箱" />
    </NFormItem>
  </NForm>
  <div class="flex justify-end">
    <NButton @click="click">提交表单</NButton>
  </div>
</template>

<script setup lang="ts">
import {
  type FormInst,
  type FormRules,
  NForm,
  NFormItem,
  NInput,
  NRadioGroup,
  NRadio,
  NDatePicker,
  NButton
} from 'naive-ui'
import { onBeforeMount, ref } from 'vue'
import { type BasicInfo, Gender } from '../api/profile'

const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
  fetchProfile: false
})
const formRef = ref<FormInst | null>()
const data = ref<OptionalInfo>({})

const fetch = () => {}
const click = () => {
  if (formRef.value) {
    formRef.value
      .validate((err) => {
        if (!err) {
          //发起请求
          emit('complete')
        }
      })
      .catch((_) => {
        window.$message.error('请检查表单')
      })
  } else {
    window.$message.error('找不到表单实例')
  }
}

onBeforeMount(() => {
  if (props.fetchProfile) {
    fetch()
  }
})
</script>

<script lang="ts">
type Emits = {
  complete: []
}

interface Props {
  fetchProfile?: boolean
}

type OptionalInfo = Partial<BasicInfo>

const rules: FormRules = {
  code: [{ required: true, message: '请输入学号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthday: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入电话', trigger: 'blur' },
    {
      required: true,
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的电话',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      required: true,
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      message: '请输入正确的邮箱',
      trigger: 'blur'
    }
  ]
}
</script>
