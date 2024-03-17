<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-none sm:rounded-md">
      {{ props.tech }}
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'

const props = defineProps<Props>()
</script>

<script lang="ts">
interface Props {
  tech: string
}
</script>
