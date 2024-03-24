<template>
  <div v-if="data === undefined" class="w-full h-full flex flex-col items-center justify-center">
    <span class="icon-[eos-icons--bubble-loading] text-4xl" />
  </div>
  <div v-else class="flex flex-col gap-4">
    <div v-if="data.state === 'unfulfill'" class="text-lg flex items-center gap-2">
      <span class="icon-[carbon--misuse] text-[#bf616a]" />
      兴趣情况尚未填写或者填写内容过少，不能给你生成推荐。请前往兴趣页填写信息
    </div>
    <div v-else-if="data.state === 'ok'" class="text-lg flex items-center gap-2">
      <span class="icon-[websymbol--ok-circle] text-[#8fbcbb]" />兴趣情况填写信息完整或者基本完整，
      无须进行更多兴趣推荐
    </div>
    <div v-else>
      <span class="text-xl">基于你的兴趣情况，我们猜测你也可能喜欢...</span>
      <div class="flex flex-col flex-wrap gap-8 mt-4">
        <JobIntro v-for="job of data.recommend" :key="job" :job="job" />
      </div>
    </div>
    <div>
      <NButton type="info" @click="$router.push({ name: 'interest' })">
        <template #icon>
          <span class="icon-[carbon--caret-right]" />
        </template>
        修改兴趣信息
      </NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import JobIntro from '@/components/job-intro.vue'
import { type InterestResult, fetchInterestResult } from '@/api/recommand/interest_result'
import { onBeforeMount, ref } from 'vue'

const data = ref<InterestResult>()
onBeforeMount(() => fetchInterestResult().then((ok) => (data.value = ok)))
</script>
