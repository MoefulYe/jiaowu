<template>
  <div class="flex flex-col sm:flex-row items-start rounded-2xl">
    <div class="flex-none w-96 relative min-h-[16rem]">
      <img
        :src="`/img/jobs/${job}.avif`"
        class="absolute inset-0 w-full h-full object-cover rounded-l-2xl"
        loading="lazy"
        :alt="job"
      />
    </div>
    <div class="grow p-6 whitespace-pre-wrap h-full">
      <div class="text-lg font-bold">{{ job }}</div>
      <VueTypedJs :strings="[INTRO[job]]" :type-speed="50" :loop="false">
        <span class="typing"></span>
      </VueTypedJs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VueTypedJs } from 'vue3-typed-ts'
import introductions from 'assets/introductions.json'
defineProps<{
  job: string
}>()
</script>

<script lang="ts">
const INTRO: Record<string, string> = introductions
</script>
