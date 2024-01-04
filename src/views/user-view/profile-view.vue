<template>
  <div class="p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-lg">
      <BasicInfoForm fetch-profile />
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'
import BasicInfoForm from '../../components/basic-info-form.vue'
</script>
