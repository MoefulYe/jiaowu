<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center bg-[url('/img/register-bg.webp')] bg-center bg-cover"
  >
    <NCard v-if="step === Step.Register" class="w-fit h-fit m-12 shadow-sm">
      <template #header> <div class="flex justify-center">注册账号</div> </template>
      <template #default>
        <RegisterForm @login="gotoLogin" @success="() => (step = Step.FillBasicInfo)" />
      </template>
    </NCard>
    <NCard v-else-if="step === Step.FillBasicInfo" class="w-fit h-fit m-12 shadow-sm">
      <template #header> <div class="flex justify-center">填写基本信息</div> </template>
      <template #default>
        <BasicInfoForm @complete="() => (step = Step.FillAcademicInfo)" />
      </template>
    </NCard>
    <NCard v-else-if="step === Step.FillAcademicInfo" class="w-fit h-fit m-12 shadow-sm">
      <template #header> <div class="flex justify-center">填写学业信息</div> </template>
      <template #default>
        <AcademicInfoForm @complete="() => (step = Step.Ok)" />
      </template>
    </NCard>
    <NCard v-else-if="step === Step.Ok" class="w-fit h-fit m-12 shadow-sm">
      <template #header> <div class="flex justify-center">注册成功</div> </template>
      <template #default>
        <GuidetoWelcome />
      </template>
    </NCard>
    <NProgress
      class="fixed bottom-0"
      :show-indicator="false"
      :percentage="7 + step * 31"
      :height="4"
      :border-radius="0"
    />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import RegisterForm from '../components/register-form.vue'
import { NCard, NButton, NProgress } from 'naive-ui'
import { gotoLogin } from '../router'

const step = ref(Step.Register)
</script>

<script lang="tsx">
import { defineComponent } from 'vue'
import { gotoHome } from '../router'
import BasicInfoForm from '../components/basic-info-form.vue'
import AcademicInfoForm from '../components/academic-info-form.vue'

enum Step {
  Register,
  FillBasicInfo,
  FillAcademicInfo,
  Ok
}

const GuidetoWelcome = defineComponent({
  name: 'GuidetoWelcome',
  setup: () => {
    const countDown = ref(5)
    const handler = setInterval(() => {
      countDown.value--
      if (countDown.value === 0) {
        clearInterval(handler)
        gotoHome()
      }
    }, 1000)
    return () => (
      <div class="flex flex-col items-center gap-4">
        <div>{countDown.value} 秒后跳转到主页 </div>
        <div>
          <NButton
            onClick={() => {
              clearInterval(handler)
              gotoHome()
            }}
          >
            不想等待? 点此跳转
          </NButton>
        </div>
      </div>
    )
  }
})
</script>
