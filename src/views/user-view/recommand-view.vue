<template>
  <div class="p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style="display: flex; flex-direction: column; gap: 4rem;"
    >
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[carbon--cube]" /> 职业评估
          </span></NBreadcrumbItem
        >
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[teenyicons--bulb-on-outline]" /> 职业测评
          </span></NBreadcrumbItem
        >
        <div class="w-full flex justify-center text-xl mb-4">你可能适合的方向</div>
        <div class="w-full flex flex-col gap-8">
          <JobIntro v-for="job of data" :key="job" :job="job" />
        </div>
      </NBreadcrumb>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NBreadcrumb, NBreadcrumbItem, NCard } from 'naive-ui'
import { JOBS } from '../../api/jobs'
import JobIntro from '../../components/job-intro.vue'

const data = ref(JOBS.slice(0, 4))
</script>
