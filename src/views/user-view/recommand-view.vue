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
        <div class="w-full flex flex-col gap-4">
          <NCard v-for="job of data" :key="job">
            <template #header>
              <div class="text-lg">{{ job }}</div>
            </template>
            <template #default>
              <div class="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
                <div class="lg:col-span-4 mt-10 lg:mt-0">
                  <img
                    class="w-full rounded-xl shadow-xl"
                    :src="`/img/jobs/${job}.avif`"
                    alt="Image Description"
                  />
                </div>
              </div>
            </template>
          </NCard>
        </div>
      </NBreadcrumb>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { jobs } from '../../api/mock'
import { NBreadcrumb, NBreadcrumbItem, NCard } from 'naive-ui'

const data = ref(jobs.slice(0, 4))
</script>
