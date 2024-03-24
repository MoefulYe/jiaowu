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
import { onBeforeMount, ref, shallowRef } from 'vue'
import { type BasicInfo, Gender, fetchBasicInfo, modifyBasicInfo } from '@/api/user/profile'

const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
  fetchProfile: false
})
const formRef = shallowRef<FormInst>()
const data = ref<BasicInfo>({})

const click = async () => {
  try {
    await formRef.value!.validate()
    await modifyBasicInfo(data.value)
    if (props.fetchProfile) {
      window.$message.success('修改成功')
    }
    emit('complete')
  } catch {
    // do nothing
  }
}

onBeforeMount(() => {
  if (props.fetchProfile) {
    fetchBasicInfo().then((ok) => (data.value = ok))
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

const rules: FormRules = {
  email: [
    {
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      message: '请输入正确的邮箱',
      trigger: 'blur'
    }
  ]
}
</script>
