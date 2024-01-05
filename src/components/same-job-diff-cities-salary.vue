<template>
  <h2 class="text-xl font-bold">相同职位不同城市对比</h2>
  <div class="flex mb-4">
    <NSelect
      v-model:value="cmpCities"
      :options="cmpCityOpts"
      class="w-96 m-2"
      placeholder="对比城市"
      multiple
    />
    <NButton class="inline m-2" @click="fetchData">确认</NButton>
  </div>
  <VChart :option="chartOpts" :style="`height: ${cmpCities.length * 3 + 18}rem`" autoresize />
  <h2 class="text-lg font-bold">这些地区的相关企业:</h2>
  <div v-for="{ region, companyList } in companies" :key="region" class="p-2">
    <span>{{ region }}：</span>
    <RouterLink
      v-for="company in companyList"
      :key="company"
      :to="{
        name: 'company',
        params: {
          company
        }
      }"
    >
      <NTag type="success" :bordered="false" class="mx-1">{{ company }}</NTag>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { type SalaryAnalysis, fetchSalaryCompareReigon } from '../api/data_analysis/salary'
import { computed, ref } from 'vue'
import { NSelect, type SelectOption, NButton, NTag } from 'naive-ui'
import { BarChart } from 'echarts/charts'
import { use } from 'echarts/core'
import { RouterLink } from 'vue-router'
import { type RalateCompanies, fetchRelateRegion } from '../api/data_analysis/company'
import {
  GridComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  type MarkAreaComponentOption,
  MarkAreaComponent,
  MarkLineComponent,
  type MarkLineComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import VChart from 'vue-echarts'
use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent,
  TooltipComponent,
  MarkAreaComponent,
  MarkLineComponent
])
type ChartOpts = ComposeOption<
  | GridComponentOption
  | BarSeriesOption
  | LegendComponentOption
  | TooltipComponentOption
  | MarkAreaComponentOption
  | MarkLineComponentOption
>

const props = defineProps<Props>()
const cmpCities = ref<string[]>([])
const cmp = ref<SalaryAnalysis[]>([])
const companies = ref<RalateCompanies[]>([])
const cmpCityOpts = computed<SelectOption[]>(() =>
  props.cities
    .filter((city) => city !== props.city)
    .map((city) => ({
      value: city,
      label: city
    }))
)

const fetchData = () => {
  fetchSalaryCompareReigon({
    city: props.city!,
    jobName: props.job!,
    choiceList: cmpCities.value
  }).then((ok) => (cmp.value = ok))
  fetchRelateRegion({
    city: props.city,
    jobName: props.job,
    choiceList: cmpCities.value
  }).then((ok) => (companies.value = ok))
}

const chartOpts = computed<ChartOpts>(() => {
  const data = props.data ? [props.data, ...cmp.value] : []
  return {
    grid: [
      { left: '7%', top: '11%', width: '38%', height: '30%' },
      { right: '7%', top: '11%', width: '38%', height: '30%' },
      { left: '7%', bottom: '7%', width: '38%', height: '30%' },
      { right: '7%', bottom: '7%', width: '38%', height: '30%' }
    ],
    xAxis: [
      { gridIndex: 0, axisLabel: { formatter: '{value}K' } },
      { gridIndex: 1, axisLabel: { formatter: '{value}K' } },
      { gridIndex: 2, axisLabel: { formatter: '{value}K' } },
      { gridIndex: 3 }
    ],
    yAxis: [
      { gridIndex: 0, type: 'category', name: '平均薪资' },
      { gridIndex: 1, type: 'category', name: '最少薪资' },
      { gridIndex: 2, type: 'category', name: '最多薪资' },
      { gridIndex: 3, type: 'category', name: '岗位数量' }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: [
      {
        type: 'bar',
        name: '平均薪资',
        data: data
          .map((item): [number, string] => [item.avgSalary, item.region])
          .sort(([a], [b]) => a - b),
        xAxisIndex: 0,
        yAxisIndex: 0,
        colorBy: 'data',
        label: {
          show: true,
          formatter: ({ value }) => `${(value as [number, string])[0]}K`,
          color: '#4c566a',
          position: 'right'
        },
        markArea: {
          itemStyle: {
            color: '#e5e9f07f'
          },
          data: [[{ yAxis: props.city }, { yAxis: props.city }]]
        },
        tooltip: {
          valueFormatter: (value) => `${value}K`
        },
        markLine: {
          symbol: 'none',
          label: {
            show: true,
            position: 'end',
            formatter: ({ name }) => name,
            color: '#4c566a'
          },
          lineStyle: {
            color: '#4c566a'
          },
          data: [{ type: 'average', name: '平均' }]
        }
      },
      {
        type: 'bar',
        name: '最少薪资',
        data: data
          .map((item): [number, string] => [item.minSalary, item.region])
          .sort(([a], [b]) => a - b),
        xAxisIndex: 1,
        yAxisIndex: 1,
        colorBy: 'data',
        label: {
          show: true,
          formatter: ({ value }) => `${(value as [number, string])[0]}K`,
          color: '#4c566a',
          position: 'right'
        },
        markArea: {
          itemStyle: {
            color: '#e5e9f07f'
          },
          data: [[{ yAxis: props.city }, { yAxis: props.city }]]
        },
        tooltip: {
          valueFormatter: (value) => `${value}K`
        },
        markLine: {
          symbol: 'none',
          label: {
            show: true,
            position: 'end',
            formatter: ({ name }) => name,
            color: '#4c566a'
          },
          lineStyle: {
            color: '#4c566a'
          },
          data: [{ type: 'average', name: '平均' }]
        }
      },
      {
        type: 'bar',
        name: '最多薪资',
        data: data
          .map((item): [number, string] => [item.maxSalary, item.region])
          .sort(([a], [b]) => a - b),
        xAxisIndex: 2,
        yAxisIndex: 2,
        colorBy: 'data',
        label: {
          show: true,
          formatter: ({ value }) => `${(value as [number, string])[0]}K`,
          color: '#4c566a',
          position: 'right'
        },
        markArea: {
          itemStyle: {
            color: '#e5e9f07f'
          },
          data: [[{ yAxis: props.city }, { yAxis: props.city }]]
        },
        tooltip: {
          valueFormatter: (value) => `${value}K`
        },
        markLine: {
          symbol: 'none',
          label: {
            show: true,
            position: 'end',
            formatter: ({ name }) => name,
            color: '#4c566a'
          },
          lineStyle: {
            color: '#4c566a'
          },
          data: [{ type: 'average', name: '平均' }]
        }
      },
      {
        type: 'bar',
        name: '岗位数量',
        data: data
          .map((item): [number, string] => [item.jobNum, item.region])
          .sort(([a], [b]) => a - b),
        xAxisIndex: 3,
        yAxisIndex: 3,
        colorBy: 'data',
        label: {
          show: true,
          color: '#4c566a',
          position: 'right'
        },
        markArea: {
          itemStyle: {
            color: '#e5e9f07f'
          },
          data: [[{ yAxis: props.city }, { yAxis: props.city }]]
        },
        markLine: {
          symbol: 'none',
          label: {
            show: true,
            position: 'end',
            formatter: ({ name }) => name,
            color: '#4c566a'
          },
          lineStyle: {
            color: '#4c566a'
          },
          data: [{ type: 'average', name: '平均' }]
        }
      }
    ]
  }
})
</script>

<script lang="ts">
interface Props {
  job: string
  jobs: string[]
  city: string
  cities: string[]
  data?: SalaryAnalysis
}
</script>
