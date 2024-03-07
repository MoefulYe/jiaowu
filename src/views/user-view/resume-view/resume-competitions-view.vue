<template>
  <div>
    <NCard> </NCard>
  </div>
</template>

<script setup lang="ts">
import { Ncard } from 'naive-ui'
</script>

<script lang="ts">
export interface Competition {
  name: string
  price: string
  description?: string
}

export type OptionalCompetition = Partial<Competition>
</script>
