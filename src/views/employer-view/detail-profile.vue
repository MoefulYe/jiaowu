<template>
  <div v-if="profile === undefined" class="flex items-center justify-center w-full h-full">
    <span class="icon-[line-md--loading-loop] text-4xl" />
  </div>
  <div v-else class="p-6">
    <NH2 class="flex justify-center"> 求职者{{ profile.basic.name }}的简历 </NH2>
    <NH3>基本信息</NH3>
    <NP />
  </div>
</template>

<script setup lang="ts">
import { fetchEmployeeProfileById } from '@/api/employee'
import { Profile } from '@/api/user/profile'
import { NH2, NH3, NP } from 'naive-ui'
import { ref } from 'vue'

const profile = ref<Profile>()

const fetch = async (id: number) => {
  profile.value = undefined
  profile.value = await fetchEmployeeProfileById(id)
}

defineExpose({ fetch })
</script>
