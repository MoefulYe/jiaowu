<template>
  <n-result status="404" title="404 未来即将添加的功能，敬请期待" class="p-8">
    <template #footer>
      <n-button @click="gotoHome(useStateStore().role())"> 返回首页 </n-button>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { gotoHome } from '@/router'
import { useStateStore } from '@/stores/user-state'
import { NResult, NButton } from 'naive-ui'
</script>
