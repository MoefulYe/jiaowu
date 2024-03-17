<template>
  <n-result status="404" title="404 页面不存在" class="p-8">
    <template #footer>
      <NButton @click="gotoHome"> 返回首页 </NButton>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { NButton, NResult } from 'naive-ui'
import { gotoHome } from '@/router'
</script>
