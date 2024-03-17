<template>
  <n-result status="error" title="401 页面不许访问" class="p-8">
    <template #footer>
      <NButton @click="gotoHome(useStateStore().role())"> 返回首页 </NButton>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { gotoHome } from '@/router'
import { useStateStore } from '@/stores/user-state'
import { NButton, NResult } from 'naive-ui'
</script>
