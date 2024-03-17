<template>
  <n-result status="404" title="404 页面不存在" class="p-8">
    <template #footer>
      <NButton @click="gotoHome(useStateStore().role())">返回首页</NButton>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { gotoHome } from '@/router'
import { useStateStore } from '@/stores/user-state'
import { NButton, NResult } from 'naive-ui'
</script>
