<template>
  <div class="p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style="display: flex; flex-direction: column; gap: 1rem;"
    >
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[ph--person-arms-spread]" />
            个人中心
          </span>
        </NBreadcrumbItem>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[ant-design--idcard-outlined]" />
            基本信息
          </span>
        </NBreadcrumbItem>
      </NBreadcrumb>
      <BasicInfoForm fetch-profile />
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NCard } from 'naive-ui'
import BasicInfoForm from '@/components/basic-info-form.vue'
</script>
