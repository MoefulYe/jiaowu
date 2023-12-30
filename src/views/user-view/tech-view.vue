<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-none sm:rounded-md">
      {{ tech }}
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NCard } from 'naive-ui'
const tech = useRoute().params.tech as string
</script>
