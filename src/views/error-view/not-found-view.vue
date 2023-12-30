<template>
  <n-result status="404" title="404 页面不存在" class="p-8">
    <template #footer>
      <NButton @click="goHome"> 返回首页 </NButton>
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { NResult } from 'naive-ui/lib'

const goHome = () => window.$router.push({ name: 'welcome' })
</script>
