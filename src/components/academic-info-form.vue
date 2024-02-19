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
  type FormInst,
  type FormRules,
  NForm,
  NInput,
  NRadioGroup,
  NRadio,
  NDatePicker,
  NButton,
  NInputNumber,
  NGrid,
  NFormItemGi
} from 'naive-ui'
import { onBeforeMount, ref, shallowRef } from 'vue'
import { type AcademicInfo, StudentType } from '../api/user/profile'

const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
  fetchProfile: false
})
const formRef = shallowRef<FormInst>()
const data = ref<AcademicInfo>({})

const fetch = () => {}
const click = async () => {
  try {
    await formRef.value!.validate()
    emit('complete')
  } catch {
    // do nothing
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

const rules: FormRules = {}
</script>
