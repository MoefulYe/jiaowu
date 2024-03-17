<template>
  <RouterView />
</template>

<script setup lang="tsx">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useDialog, useLoadingBar, useMessage } from 'naive-ui'

onBeforeMount(async () => {
  window.$loading = useLoadingBar()
  window.$message = useMessage()
  window.$router = useRouter()
  window.$dialog = useDialog()
})
</script>
