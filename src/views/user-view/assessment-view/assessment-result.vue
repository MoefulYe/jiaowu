<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col items-center gap-4">
      <h2>测试结果</h2>
      <VChart :option="option" class="h-96 w-96" autoresize ref="chartRef" />
      <NTooltip placement="bottom">
        <template #trigger>
          <NButton type="primary" @click="share">
            <span class="icon-[ph--share]" />
          </NButton>
        </template>
        <template #default> 分享结果 </template>
      </NTooltip>
    </div>
    <NDivider />
    <div class="flex flex-col gap-12 items-center w-full">
      <div class="text-xl">职位推荐</div>
      <div class="w-full" v-for="job in recommended" :key="job">
        <JobIntro :job="job" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { use } from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { TitleComponent, LegendComponent, GraphicComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { RadarSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  LegendComponentOption,
  GraphicComponentOption,
  RadarComponentOption
} from 'echarts/components'
import VChart from 'vue-echarts'
import { NButton, NDivider, NTooltip } from 'naive-ui'
import { JOBS } from 'api/jobs'
import JobIntro from 'components/job-intro.vue'
import { useStateStore } from 'stores/user-state'
use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, GraphicComponent])

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | LegendComponentOption
  | RadarSeriesOption
  | GraphicComponentOption
  | RadarComponentOption
>
const props = withDefaults(
  defineProps<{
    scores?: number[]
  }>(),
  {
    scores: () => []
  }
)
const option = computed<EChartsOption>(() => ({
  graphic: [
    {
      type: 'circle'
    }
  ],
  radar: {
    indicator: JOBS.map((job) => ({ name: job, max: 25, min: 0 }))
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: props.scores,
          symbol: 'none'
        }
      ]
    }
  ]
}))
const recommended = computed(() =>
  props.scores
    .map((score, idx) => ({ score, job: JOBS[idx] }))
    .filter(({ score }) => score > 15)
    .sort(({ score: a }, { score: b }) => b - a)
    .map(({ job }) => job)
    .slice(0, 3)
)

const share = () =>
  navigator.clipboard
    .writeText(`${useStateStore().username}适合当${recommended.value.join(',')}`)
    .then(() => window.$message.success('复制成功'))
</script>
