<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-none sm:rounded-md">
      {{ TITLE }}
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'
import { TITLE } from '../../constants'
</script>
