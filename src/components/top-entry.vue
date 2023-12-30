<template>
  <RouterView />
</template>

<script setup lang="tsx">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingBar, useMessage } from 'naive-ui'

onMounted(async () => {
  window.$loading = useLoadingBar()
  window.$message = useMessage()
  window.$router = useRouter()
})
</script>
