<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style=" display: flex; flex-direction: column; align-items: center; gap: 2rem;"
    >
      <span class="mt-4 text-2xl"> 欢迎来到{{ TITLE }}! </span>
      <NDivider>应用导航</NDivider>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[60px] gap-y-[48px]"
      >
        <div
          v-for="{ title, to, icon } in items"
          :key="to"
          @click="() => $router.push({ name: to })"
          class="nav-item flex flex-col items-center justify-around"
        >
          <div :class="['text-[120px]', icon]" />
          <span class="text-base md:text-lg">{{ title }}</span>
        </div>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NDivider } from 'naive-ui'
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
  { icon: 'icon-[ph--heart-thin]', to: 'interest', title: '兴趣方向' },
  { icon: 'icon-[et--tools-2]', to: 'skill', title: '技能评估' },
  { icon: 'icon-[ph--lightbulb-thin]', to: 'recommand', title: '方向推荐' },
  { icon: 'icon-[ph--paper-plane-tilt-thin]', to: 'study-plan', title: '学习规划' },
  { icon: 'icon-[lets-icons--materials-light]', to: 'study-material', title: '资源推荐' }
]
</script>

<style lang="scss" scoped>
.nav-item {
  border-radius: 1.5rem;
  padding: 1rem;
}

@media (hover: hover) {
  .nav-item:hover {
    background-color: rgba(129, 161, 193, 0.2);
    color: rgb(94, 129, 172);
  }
}
</style>
