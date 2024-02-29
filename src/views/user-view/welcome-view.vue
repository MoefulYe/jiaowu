<template>
  <div
    class="w-full h-full flex flex-col items-center bg-[url('/img/home-bg.avif')] bg-center bg-cover font-serif"
  >
    <span class="mt-8 text-2xl text-white"> 欢迎来到{{ TITLE }}! </span>
    <div class="flex flex-col justify-center items-center w-full h-full">
      <NCard
        class="shadow-lg rounded-lg h-fit w-fit"
        content-style="display: flex; flex-direction: column; align-items: center; gap: 2rem;"
      >
        <template #header>
          <span class="flex justify-center">
            <span class="flex items-center gap-2"
              ><span class="icon-[ph--navigation-arrow]" /> 应用导航</span
            >
          </span>
        </template>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-[40px] gap-y-[24px] p-4">
          <div
            v-for="{ title, to, icon } in items"
            :key="to"
            @click="() => $router.push({ name: to })"
            class="nav-item flex flex-col items-center justify-around w-[80px] h-[80px] transition-colors cursor-pointer ease-in-out delay-150 p-2 rounded-3xl"
          >
            <div :class="['text-[60px]', icon]" />
            <span class="text-base">{{ title }}</span>
          </div>
        </div>
      </NCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'
import { TITLE } from '../../constants'

interface NavItem {
  icon: string
  title: string
  to: string
}

const items: NavItem[] = [
  { icon: 'icon-[ph--identification-card-thin]', to: 'profile', title: '基本信息' },
  { icon: 'icon-[ph--student-thin]', to: 'academic', title: '学业信息' },
  { icon: 'icon-[ph--chart-bar-horizontal-thin]', to: 'job-market', title: '职业行情' },
  { icon: 'icon-[ph--chart-pie-slice-thin]', to: 'skill-required', title: '技能需求' },
  { icon: 'icon-[ph--chart-line-up-thin]', to: 'trend', title: '趋势分析' },
  { icon: 'icon-[ph--exam-thin]', to: 'assessment', title: '职业测评' },
  { icon: 'icon-[ph--heart-thin]', to: 'interest', title: '兴趣方向' },
  { icon: 'icon-[ph--lightbulb-thin]', to: 'recommand', title: '方向推荐' },
  { icon: 'icon-[ph--paper-plane-tilt-thin]', to: 'study-plan', title: '学习规划' },
  { icon: 'icon-[lets-icons--materials-light]', to: 'study-material', title: '资源推荐' }
]
</script>

<style lang="scss" scoped>
.nav-item:hover {
  background-color: rgba(129, 161, 193, 0.2);
  color: rgb(94, 129, 172);
}
</style>
