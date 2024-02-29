<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style="display: flex; flex-direction: column; gap: 2rem;"
    >
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[carbon--cube]" /> 职业评估
          </span></NBreadcrumbItem
        >
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[ph--exam]" /> 职业测评
          </span></NBreadcrumbItem
        >
      </NBreadcrumb>
      <div class="grow flex items-center justify-center">
        <AssessmentBegin :has-assessed-before="false" class="bottom-12" />
      </div>
    </NCard>
    <NProgress
      class="fixed bottom-0"
      type="line"
      :height="4"
      :percentage="4"
      :border-radius="0"
      :show-indicator="false"
    />
  </div>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NCard, NProgress } from 'naive-ui'
import { ref } from 'vue'
import AssessmentBegin from './assessment-begin.vue'
const progress = ref(7)
</script>
