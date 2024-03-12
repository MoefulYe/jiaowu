<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style="display: flex; flex-direction: column; gap: 2rem;"
    >
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[carbon--cube]" /> 职业评估
          </span></NBreadcrumbItem
        >
        <NBreadcrumbItem>
          <span class="flex items-center gap-1"> <span class="icon-[ph--heart]" /> 兴趣方向 </span>
        </NBreadcrumbItem>
      </NBreadcrumb>
      <div class="flex justify-evenly items-center gap-2 grow">
        <div class="flex flex-col gap-2 justify-center items-center">
          <div
            v-for="[direction, i] of jobs.map((v, i): [string, number] => [v, i])"
            :key="direction"
            class="flex gap-2 items-center"
          >
            <span class="w-16">{{ direction }}</span
            ><EmojiRadio v-model="data[i]" emoji-class="text-3xl" />
          </div>
        </div>
        <VChart :option="option" autoresize class="w-96 h-96 lg:w-[36rem] lg:h-[36rem]" />
      </div>
      <template #footer>
        <div class="flex gap-4">
          <NButton type="primary" @click="submit">保存</NButton>
          <NButton
            type="info"
            @click="
              async () => {
                if (await confirm('复位', '确定清除兴趣方向?', 'info')) {
                  data.forEach((_, i) => (data[i] = undefined))
                }
              }
            "
            >复位</NButton
          >
        </div>
      </template>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NButton, NCard } from 'naive-ui'
import { computed, ref } from 'vue'

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
import EmojiRadio from '../../components/emoji-radio.vue'
import confirm from '../../components/confirm'
import { jobs } from '../../api/mock'

use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, GraphicComponent])

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | LegendComponentOption
  | RadarSeriesOption
  | GraphicComponentOption
  | RadarComponentOption
>
type Score = number | undefined
const data = ref<Score[]>(jobs.map(() => undefined))
const _data = computed(() => data.value.map((val) => val ?? 0))
const option = computed<EChartsOption>(() => ({
  graphic: [
    {
      type: 'circle'
    }
  ],
  radar: {
    indicator: jobs.map((job) => ({ name: job, max: 5, min: 0 }))
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: _data.value,
          symbol: 'none'
        }
      ]
    }
  ]
}))
const submit = async () => {
  // TODO: submit data
}
</script>
