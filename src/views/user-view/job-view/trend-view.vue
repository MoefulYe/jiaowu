<template>
  <div class="p-2 grow flex flex-col">
    <NCard
      class="rounded-lg shadow-sm grow"
      content-style="display: flex; flex-direction: column; flex-grow: 1"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold">趋势分析</h2>
          <span class="text-lg pb-1">筛选</span>
          <div class="flex">
            <NSelect
              v-model:value="job"
              :options="JOB_OPTS"
              class="inline w-24 p-2"
              placeholder="职位"
            />
            <NSelect
              v-model:value="city"
              :options="CITY_OPTS"
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
        <VChart :option="chartOpts1" autoresize class="h-96" />
        <VChart :option="chartOpts2" autoresize class="h-96" />
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, type SelectOption, NSelect, NButton } from 'naive-ui'
import { computed, ref } from 'vue'
import { DEFAULT_JOB, JOB_OPTS } from 'api/jobs'
import { CITY_OPTS, DEFAULT_CITY } from 'api/city'

import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import type { TooltipComponentOption } from 'echarts/components'
import { TooltipComponent } from 'echarts/components'
import type { BarSeriesOption } from 'echarts'
import { BarChart } from 'echarts/charts'
import { LegendComponent } from 'echarts/components'
import type { LegendComponentOption } from 'echarts'
import { TimelineComponent } from 'echarts/components'
import type { TimelineComponentOption } from 'echarts'
import { PieChart } from 'echarts/charts'
import type { PieSeriesOption } from 'echarts'
import { TitleComponent } from 'echarts/components'
import type { TitleComponentOption } from 'echarts'
import VChart from 'vue-echarts'

use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  BarChart,
  TooltipComponent,
  LegendComponent,
  TimelineComponent,
  PieChart,
  TitleComponent
])

type ChartOpts = ComposeOption<
  | GridComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
  | TimelineComponentOption
  | TitleComponentOption
>

const job = ref(DEFAULT_JOB)
const city = ref(DEFAULT_CITY)
const unit = ref(Unit.Month)

const chartOpts1 = computed<ChartOpts>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  title: [],
  legend: {},
  xAxis: { type: 'category' },
  yAxis: [
    { type: 'value', axisLabel: { formatter: '{value}K' }, name: '薪资变化趋势' },
    { type: 'value', name: '岗位数量变化趋势', position: 'right', alignTicks: true }
  ],
  series: [
    {
      type: 'line',
      name: '最低薪资',
      data: Array.from({ length: 12 }).map((_, i) => [`${i + 1}月`, i + 1]),
      yAxisIndex: 0,
      showSymbol: false,
      tooltip: {
        valueFormatter: (value) => `${(value as number).toFixed(0)}K`
      }
    },
    {
      type: 'line',
      name: '平均薪资',
      data: Array.from({ length: 12 }).map((_, i) => [`${i + 1}月`, (i + 1) * 2]),
      yAxisIndex: 0,
      showSymbol: false,
      tooltip: {
        valueFormatter: (value) => `${(value as number).toFixed(0)}K`
      }
    },
    {
      type: 'line',
      name: '最高薪资',
      data: Array.from({ length: 12 }).map((_, i) => [`${i + 1}月`, (i + 1) * 3]),
      yAxisIndex: 0,
      showSymbol: false,
      tooltip: {
        valueFormatter: (value) => `${(value as number).toFixed(0)}K`
      }
    },
    {
      type: 'line',
      name: '岗位数量',
      data: Array.from({ length: 12 }).map((_, i) => [`${i + 1}月`, Math.random() * 100]),
      yAxisIndex: 1,
      showSymbol: false,
      tooltip: {
        valueFormatter: (value) => (value as number).toFixed(0)
      }
    }
  ]
}))

const tech = [
  'java',
  'python',
  'c++',
  'c#',
  'php',
  'javascript',
  'html',
  'css',
  'sql',
  'typescript'
]

const rate = [0.3, 0.2, 0.1, 0.08, 0.07, 0.06, 0.06, 0.05, 0.04, 0.04]

const chartOpts2 = computed<ChartOpts>(() => ({
  baseOption: {
    timeline: {
      axisType: 'category',
      autoPlay: true,
      playInterval: 3000,
      data: Array.from({ length: 12 }).map((_, i) => `${i + 1}月`)
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {},
    series: [
      {
        type: 'pie',
        name: '技术需求',
        radius: [40, 100],
        center: ['25%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, position: 'center', formatter: '技术需求' },
        labelLine: { show: false },
        tooltip: {
          valueFormatter: (value) => `${((value as number) * 100).toFixed(0)}%`
        }
      },
      {
        name: '龙头企业',
        type: 'pie',
        radius: [40, 100],
        center: ['75%', '50%'],
        roseType: 'area',
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, position: 'center', formatter: '龙头企业' },
        labelLine: { show: false },
        data: [
          { value: 30, name: '华为' },
          { value: 20, name: '腾讯' },
          { value: 10, name: '字节' },
          { value: 8, name: '阿里' },
          { value: 7, name: '杭电' },
          { value: 6, name: '浙大' },
          { value: 6, name: '科大' },
          { value: 5, name: '拼多多' },
          { value: 4, name: '狗东' },
          { value: 4, name: '范大勤' }
        ]
      }
    ]
  },
  options: Array.from({ length: 12 }).map((_, i) => ({
    series: [
      {
        data: Array.from({ length: 10 }).map((_, j) => ({
          value: rate[j],
          name: tech[(i + j) % 10]
        }))
      },
      {}
    ]
  }))
}))
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
