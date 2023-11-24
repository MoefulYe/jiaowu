<template>
  <div class="w-full h-full flex justify-center items-center">欢迎使用{{ TITLE }}</div>
</template>

<script setup lang="ts">
const TITLE = import.meta.env.VITE_TITLE
</script>
