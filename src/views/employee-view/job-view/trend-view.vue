<template>
  <div class="p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style="display: flex; flex-direction: column; gap: 1rem;"
    >
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[solar--global-outline]" />
            市场行情
          </span>
        </NBreadcrumbItem>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[ph--trend-up]" />
            趋势分析
          </span>
        </NBreadcrumbItem>
      </NBreadcrumb>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <div class="flex items-center">
            <NSelect
              v-model:value="queryParams.direction"
              :options="DIRECTION_OPTS"
              class="inline w-36 p-2"
              placeholder="职位"
            />
            <NSelect
              v-model:value="queryParams.timeUnit"
              :options="unitOpts"
              class="inline w-16 p-2"
              placeholder="单位"
            />
            <NDatePicker
              :type="timeUnit2NDatePickerType(queryParams.timeUnit)"
              value-format="yyyy-MM-dd"
              v-model:formatted-value="queryParams.range"
            />
            <NButton class="inline m-2" @click="fetch">确认</NButton>
          </div>
        </div>
        <VChart :option="opts" autoresize class="h-96 lg:h-[36rem]" v-if="fetched" />
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import {
  NCard,
  type SelectOption,
  NSelect,
  NButton,
  NBreadcrumb,
  NBreadcrumbItem,
  NDatePicker
} from 'naive-ui'
import { computed, ref } from 'vue'
import {
  TimeUnit,
  defaultTrendQueryParams,
  DIRECTION_OPTS,
  type TrendItem,
  fetchTrend
} from '@/api/data_analysis/trend'

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
import type { LegendComponentOption } from 'echarts'
import type { DataZoomComponentOption } from 'echarts'
import { DataZoomComponent } from 'echarts/components'
import { TimelineComponent } from 'echarts/components'
import type { TimelineComponentOption } from 'echarts'
import { PieChart } from 'echarts/charts'
import type { PieSeriesOption } from 'echarts'
import VChart from 'vue-echarts'
import type { DatePickerType } from 'naive-ui/lib/date-picker/src/config'

use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  TooltipComponent,
  TimelineComponent,
  PieChart,
  DataZoomComponent
])

type ChartOpts = ComposeOption<
  | GridComponentOption
  | LineSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
  | TimelineComponentOption
  | DataZoomComponentOption
>

const queryParams = defaultTrendQueryParams()
const data = ref<TrendItem[]>([])
const fetched = ref(false)

const fetch = () =>
  fetchTrend(queryParams.value).then((ok) => {
    data.value = ok
    fetched.value = true
  })
const opts = computed<ChartOpts>(() => ({
  dataZoom: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  xAxis: { type: 'category', data: data.value.map((_) => _.time) },
  yAxis: [
    { type: 'value', axisLabel: { formatter: '{value}K' }, name: '薪资变化趋势' },
    { type: 'value', name: '岗位数量变化趋势', position: 'right', alignTicks: true }
  ],
  series: [
    {
      type: 'line',
      name: '平均薪资',
      data: data.value.map((_) => _.salary),
      yAxisIndex: 0,
      showSymbol: false,
      tooltip: {
        valueFormatter: (value) => `${(value as number).toFixed(0)}K`
      }
    },
    {
      type: 'line',
      name: '岗位数量',
      data: data.value.map((_) => _.jobCnt),
      yAxisIndex: 1,
      showSymbol: false,
      tooltip: {
        valueFormatter: (value) => `${(value as number).toFixed(0)}`
      }
    }
  ]
}))
</script>

<script lang="ts">
const unitOpts: SelectOption[] = [
  {
    label: '年',
    value: TimeUnit.Year
  },
  {
    label: '月',
    value: TimeUnit.Month
  },
  {
    label: '日',
    value: TimeUnit.Day
  }
]

const timeUnit2NDatePickerType = (unit: TimeUnit): DatePickerType => {
  switch (unit) {
    case TimeUnit.Day:
      return 'daterange'
    case TimeUnit.Month:
      return 'monthrange'
    case TimeUnit.Year:
      return 'yearrange'
  }
}
</script>
