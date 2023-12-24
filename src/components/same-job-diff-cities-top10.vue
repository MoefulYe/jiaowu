<template>same jobs</template>

<script setup lang="ts">
import { TechAnalysisResp } from '../api/data_analysis'

const props = defineProps<Props>()
</script>

<script lang="ts">
interface Props {
  job?: string
  jobs: string[]
  city?: string
  cities: string[]
  data?: TechAnalysisResp
}
</script>
