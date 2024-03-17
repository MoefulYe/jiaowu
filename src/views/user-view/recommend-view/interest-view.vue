<template>
  <div v-if="data === undefined" class="w-full h-full flex flex-col items-center justify-center">
    <span class="icon-[eos-icons--bubble-loading] text-4xl" />
  </div>
  <div v-else-if="data.state === 'unfulfill'">
    <div class="flex flex-col gap-4">
      <div>兴趣情况尚未填写未能给你生成推荐请前往兴趣页填写信息</div>
      <div>
        <NButton type="error" @click="$router.push({ name: 'interest' })"> 前往兴趣页 </NButton>
      </div>
    </div>
  </div>
  <div v-else-if="data.state === 'ok'" class="flex items-center gap-2">
    <span class="icon-[websymbol--ok-circle] text-lg text-[#8fbcbb]" />兴趣情况填写信息完整，
    无须进行更多兴趣推荐
  </div>
  <div v-else>
    <span class="text-xl">基于你的兴趣情况，我们猜测你也可能喜欢...</span>
    <div class="flex flex-col flex-wrap gap-8 mt-4">
      <JobIntro v-for="job of data.recommend" :key="job" :job="job" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type InterestResult } from 'api/recommand/interest_result'
import { NButton } from 'naive-ui'
import JobIntro from 'components/job-intro.vue'
import { JOBS } from 'api/jobs'

// const data = ref<InterestResult>({ state: 'unfulfill' })
// const data = ref<InterestResult>({
//   state: 'ok'
// })
const data = ref<InterestResult>({
  state: 'recommand',
  recommend: JOBS.slice(0, 4)
})
</script>
