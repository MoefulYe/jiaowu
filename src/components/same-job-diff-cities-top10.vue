<template>
  <h2 class="text-xl font-bold">同一职位不同城市对比</h2>
  <div v-if="rate !== undefined">
    <div class="flex mb-4">
      <NSelect
        v-model:value="cmpCites"
        :options="cmpCityOpts"
        class="w-96 m-2"
        placeholder="对比岗位"
        multiple
      />
      <NButton class="inline m-2" @click="fetchData">确认</NButton>
    </div>
    <VChart
      v-if="!loading"
      :option="options"
      :style="`height: ${cmpCites.length * 2 + 12}rem`"
      autoresize
      @mousedown="({ name }) => gotoTechPage(name)"
    />
    <NSkeleton v-else :style="`height: ${cmpCites.length * 2 + 12}rem`" class="rounded-sm" />
  </div>
  <NSkeleton v-else class="h-48 rounded-md" />
</template>

<script setup lang="ts">
import { type Tech, type Techs, fetchCompareRegion } from '@/api/data_analysis/tech'
import { ref, computed } from 'vue'
import { type SelectOption, NSelect, NButton } from 'naive-ui'
import { gotoTechPage } from '@/router'

import { BarChart } from 'echarts/charts'
import { use } from 'echarts/core'
import {
  TitleComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  type MarkAreaComponentOption,
  MarkAreaComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import VChart from 'vue-echarts'
import { CITY_OPTS } from '@/api/city'
import { NSkeleton } from 'naive-ui'
use([
  BarChart,
  CanvasRenderer,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  MarkAreaComponent,
  GridComponent
])
type ChartOpts = ComposeOption<
  | GridComponentOption
  | BarSeriesOption
  | LegendComponentOption
  | TooltipComponentOption
  | MarkAreaComponentOption
>

const props = defineProps<Props>()
const cmpCites = ref<string[]>([])
const cmp = ref<Techs>([])
const loading = ref(false)
const SIZE = 10

const cmpCityOpts = computed<SelectOption[]>(() =>
  CITY_OPTS.filter(({ value }) => value !== props.city)
)

const fetchData = async () => {
  loading.value = true
  cmp.value = await fetchCompareRegion({
    city: props.city,
    jobName: props.job,
    choiceList: cmpCites.value
  })
  loading.value = false
}

const options = computed<ChartOpts>(() => {
  const dataSet = props.rate ? [props.rate, ...cmp.value] : []
  return {
    legend: {},
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `${value * 100}%`
      },
      min: 0,
      max: 1
    },
    yAxis: {
      type: 'category'
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: Array.from({ length: SIZE }).map((_, idx) => ({
      type: 'bar',
      stack: 'total',
      data: dataSet.map(({ region, techRateList }) => {
        const { techName, rate } = techRateList[idx]
        return {
          name: techName,
          value: [rate, region],
          label: {
            show: rate > 0.06,
            formatter: `${techName}`,
            color: '#F7FAFF'
          }
        }
      }),
      markArea: {
        itemStyle: {
          color: '#e5e9f07f'
        },
        data: [[{ yAxis: props.job }, { yAxis: props.job }]]
      },
      tooltip: {
        formatter: ({ name, value }) =>
          `${name}: ${((value as [number, string])[0] * 100).toFixed(2)}%`
      }
    }))
  }
})
</script>

<script lang="ts">
interface Props {
  job: string
  city: string
  rate?: Tech
}
</script>
