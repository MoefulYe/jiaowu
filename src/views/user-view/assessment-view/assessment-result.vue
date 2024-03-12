<template>
  <div class="flex flex-col items-center gap-4">
    <h2>测试结果</h2>
    <VChart :option="option" class="h-96 w-96" autoresize ref="chartRef" />
    <NTooltip placement="bottom">
      <template #trigger>
        <NButton type="primary">
          <span class="icon-[ph--share]" @click="share" />
        </NButton>
      </template>
      <template #default> 分享结果 </template>
    </NTooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'

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
import { jobs } from '../../../api/mock'
import { NButton, NTooltip } from 'naive-ui'
use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, GraphicComponent])

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | LegendComponentOption
  | RadarSeriesOption
  | GraphicComponentOption
  | RadarComponentOption
>
const props = defineProps<{
  scores?: number[]
}>()
const chartRef = shallowRef<InstanceType<typeof VChart>>()
const option = computed<EChartsOption>(() => ({
  graphic: [
    {
      type: 'circle'
    }
  ],
  radar: {
    indicator: jobs.map((job) => ({ name: job, max: 50, min: 0 }))
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

const recommanded = computed(
  () =>
    props.scores
      ?.map((v, i) => ({ v, i }))
      .filter(({ v }) => v > 25)
      .sort(({ v: v0 }, { v: v1 }) => v1 - v0)
      .slice(0, 3)
)

const share = async () => {
  await navigator.clipboard.writeText('sss')
  window.$message.success('粘贴成功')
}
</script>
