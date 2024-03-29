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
          <div v-for="(direction, idx) in JOBS" :key="direction" class="flex gap-2 items-center">
            <span class="w-16">{{ direction }}</span
            ><EmojiRadio v-model="interest!![idx]" emoji-class="text-3xl" />
          </div>
        </div>
        <VChart :option="option" autoresize class="w-96 h-96 lg:w-[36rem] lg:h-[36rem]" />
      </div>
      <template #footer>
        <div class="flex gap-4">
          <NButton @click="saveInterest(interest!)">保存</NButton>
          <NButton
            type="info"
            @click="
              async () => {
                if (await confirm('复位', '确定清除兴趣方向?', 'info')) {
                  interest = Array.from({ length: JOBS.length })
                }
              }
            "
            >复位</NButton
          >
          <NButton
            @click="
              $router.push({
                name: 'recommand',
                query: {
                  kind: Kind.兴趣推荐
                }
              })
            "
            type="primary"
            >查看推荐信息</NButton
          >
        </div>
      </template>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NButton, NCard } from 'naive-ui'
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
import EmojiRadio from '@/components/emoji-radio.vue'
import confirm from '@/components/confirm'
import { JOBS } from '@/api/jobs'
import { saveInterest } from '@/api/assessment/interest'
import { useStateStore } from '@/stores/user-state'
import { storeToRefs } from 'pinia'
import { Kind } from './recommend-view/recommand-view.vue'

const state = useStateStore()
await state.fetchInterest()
const { interest } = storeToRefs(state)

use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, GraphicComponent])

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | LegendComponentOption
  | RadarSeriesOption
  | GraphicComponentOption
  | RadarComponentOption
>

const option = computed<EChartsOption>(() => ({
  graphic: [
    {
      type: 'circle'
    }
  ],
  radar: {
    indicator: JOBS.map((job) => ({ name: job, max: 5, min: 0 }))
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: interest.value!.map((val) => val ?? 0),
          symbol: 'none'
        }
      ]
    }
  ]
}))
</script>
