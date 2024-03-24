<template>
  <div class="p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-lg">
      <NTabs>
        <NTabPane name="基本信息">
          <AcademicInfoForm fetch-profile />
        </NTabPane>
        <NTabPane name="选课信息">
          <div>选课信息</div>
        </NTabPane>
        <NTabPane name="成绩信息">
          <div>成绩信息</div>
        </NTabPane>
      </NTabs>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NTabPane, NTabs } from 'naive-ui'
import AcademicInfoForm from '@/components/academic-info-form.vue'
</script>
