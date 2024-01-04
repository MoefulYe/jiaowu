<template>
  <NForm ref="formRef" :model="data" class="p-2" :rules="rules">
    <NGrid :cols="24" :xGap="24">
      <NFormItemGi label="学生类别" path="studentType" :span="12">
        <NRadioGroup v-model:value="data.studentType">
          <NRadio :value="StudentType.Undergraduate"> {{ StudentType.Undergraduate }}</NRadio>
          <NRadio :value="StudentType.Graduate"> {{ StudentType.Graduate }}</NRadio>
        </NRadioGroup>
      </NFormItemGi>
      <NFormItemGi label="学制" path="duration" :span="12">
        <NInputNumber v-model:value="data.duration" />
      </NFormItemGi>
      <NFormItemGi label="入学日期" path="enrollmentDate" :span="12">
        <NDatePicker v-model:formattedValue="data.enrollmentDate" />
      </NFormItemGi>
      <NFormItemGi label="毕业日期" path="graduationDate" :span="12">
        <NDatePicker v-model:formattedValue="data.graduationDate" />
      </NFormItemGi>
      <NFormItemGi label="学校" path="school" :span="12">
        <NInput v-model:value="data.school" placeholder="输入学校" />
      </NFormItemGi>
      <NFormItemGi label="学院" path="college" :span="12">
        <NInput v-model:value="data.college" placeholder="输入学院" />
      </NFormItemGi>
      <NFormItemGi label="专业" path="major" :span="12">
        <NInput v-model:value="data.major" placeholder="输入专业" />
      </NFormItemGi>
      <NFormItemGi label="班级" path="class" :span="12">
        <NInput v-model:value="data.class" placeholder="输入班级" />
      </NFormItemGi>
    </NGrid>
  </NForm>
  <div class="flex justify-end">
    <NButton @click="click">提交</NButton>
  </div>
</template>

<script setup lang="ts">
import {
  FormInst,
  NForm,
  NInput,
  NRadioGroup,
  NRadio,
  NDatePicker,
  FormRules,
  NButton,
  NInputNumber,
  NGrid,
  NFormItemGi
} from 'naive-ui'
import { onBeforeMount, ref } from 'vue'
import { AcademicInfo, StudentType } from '../api/profile'

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

type OptionalInfo = Partial<AcademicInfo>

const rules: FormRules = {
  studentType: [{ required: true, message: '请选择学生类别' }],
  duration: [{ required: true, message: '请输入学制' }],
  enrollmentDate: [{ required: true, message: '请选择入学日期' }],
  graduationDate: [{ required: true, message: '请选择毕业日期' }],
  school: [{ required: true, message: '请输入学校' }],
  college: [{ required: true, message: '请输入学院' }],
  major: [{ required: true, message: '请输入专业' }],
  class: [{ required: true, message: '请输入班级' }]
}
</script>
