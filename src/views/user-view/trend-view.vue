<template>
  <div class="p-2 grow flex flex-col">
    <NCard class="rounded-lg shadow-sm grow">
      <div class="flex flex-col">
        <h2 class="text-2xl font-bold">趋势分析</h2>
        <span class="text-lg pb-1">筛选</span>
        <div class="flex">
          <NSelect
            v-model:value="job"
            :options="jobOpts"
            class="inline w-24 p-2"
            placeholder="职位"
          />
          <NSelect
            v-model:value="city"
            :options="cityOpts"
            class="inline w-24 p-2"
            placeholder="城市"
          />
          <NSelect
            v-model:value="unit"
            :options="unitOpts"
            class="inline w-16 p-2"
            placeholder="单位"
          />
          <NButton class="inline m-2">确认</NButton>
        </div>
      </div>
      <VChart :option="chartOpts" autoresize />
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, type SelectOption, NSelect, NButton } from 'naive-ui'
import { computed, onBeforeMount, ref } from 'vue'
import { fetchCities, fetchJobs } from '../../api/mock'

import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import type { BarSeriesOption } from 'echarts'
import { BarChart } from 'echarts/charts'
import VChart from 'vue-echarts'

use([GridComponent, LineChart, CanvasRenderer, BarChart])

type ChartOpts = ComposeOption<GridComponentOption | LineSeriesOption | BarSeriesOption>

const job = ref('java')
const city = ref('杭州')
const jobs = ref<string[]>([])
const cities = ref<string[]>([])
const unit = ref(Unit.Month)

const jobOpts = computed<SelectOption[]>(() =>
  jobs.value.map((job) => ({ label: job, value: job }))
)
const cityOpts = computed<SelectOption[]>(() =>
  cities.value.map((city) => ({ label: city, value: city }))
)

const chartOpts = computed<ChartOpts>(() => ({
  grid: [
    { left: '7%', top: '11%', width: '38%', height: '30%' },
    { right: '7%', top: '11%', width: '38%', height: '30%' },
    { left: '7%', bottom: '7%', width: '38%', height: '30%' },
    { right: '7%', bottom: '7%', width: '38%', height: '30%' }
  ],
  xAxis: [
    { gridIndex: 0, type: 'category' },
    { gridIndex: 1, type: 'category' },
    { gridIndex: 2, type: 'value', axisLabel: { formatter: (value: number) => `${value * 100}%` } },
    {
      gridIndex: 3,
      type: 'value',
      axisLabel: {
        show: false
      }
    }
  ],
  yAxis: [
    { gridIndex: 0, type: 'value', axisLabel: { formatter: '{value}K' }, name: '薪资变化趋势' },
    { gridIndex: 1, type: 'value', name: '岗位数量变化趋势' },
    { gridIndex: 2, type: 'category', name: '技术需求变化' },
    { gridIndex: 3, type: 'category', name: '本地top10企业' }
  ],
  series: [
    {
      type: 'line',
      data: Array.from({ length: 12 }).map((_, i) => [`${i + 1}月`, Math.random() * 100]),
      xAxisIndex: 0,
      yAxisIndex: 0
    },
    {
      type: 'line',
      data: Array.from({ length: 12 }).map((_, i) => [`${i + 1}月`, Math.random() * 100]),
      xAxisIndex: 1,
      yAxisIndex: 1
    },
    {
      type: 'bar',
      data: [
        {
          value: [0.3, '一月'],
          name: 'python'
        },
        {
          value: [0.4, '二月'],
          name: 'java'
        }
      ],
      colorBy: 'data',
      xAxisIndex: 2,
      yAxisIndex: 2,
      label: {
        show: true
      },
      stack: 'total'
    },
    {
      type: 'bar',
      data: [
        {
          value: [0.7, '一月'],
          name: 'java'
        },
        {
          value: [0.6, '二月'],
          name: 'python'
        }
      ],
      colorBy: 'data',
      xAxisIndex: 2,
      yAxisIndex: 2,
      label: {
        show: true,
        formatter: ({ name }) => name
      },
      stack: 'total'
    },
    {
      type: 'bar',
      data: [
        {
          value: [0.5, '一月'],
          name: '字节'
        },
        {
          value: [0.5, '二月'],
          name: '阿里'
        }
      ],
      colorBy: 'data',
      xAxisIndex: 3,
      yAxisIndex: 3,
      label: {
        show: true,
        formatter: ({ name }) => name
      },
      stack: 'total0'
    },
    {
      type: 'bar',
      data: [
        {
          value: [0.5, '一月'],
          name: '阿里'
        },
        {
          value: [0.5, '二月'],
          name: '字节'
        }
      ],
      colorBy: 'data',
      xAxisIndex: 3,
      yAxisIndex: 3,
      label: {
        show: true,
        formatter: ({ name }) => name
      },
      stack: 'total0'
    }
  ]
}))

onBeforeMount(() => {
  fetchCities().then((ok) => (cities.value = ok))
  fetchJobs().then((ok) => (jobs.value = ok))
})
</script>

<script lang="ts">
enum Unit {
  Year = '年',
  Month = '月',
  Week = '周'
}

const unitOpts: SelectOption[] = Object.values(Unit).map((item) => ({
  label: item,
  value: item
}))
</script>
