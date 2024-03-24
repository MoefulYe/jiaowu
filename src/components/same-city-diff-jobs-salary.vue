<template>
  <h2 class="text-lg font-bold">同一城市不同岗位对比</h2>
  <div v-if="salaries !== undefined">
    <div class="flex mb-4">
      <NSelect
        v-model:value="cmpJobs"
        :options="cmpJobOpts"
        class="w-96 m-2"
        placeholder="对比岗位"
        multiple
      />
      <NButton class="inline m-2" @click="fetchData">确认</NButton>
    </div>
    <NSkeleton v-if="loading" :style="`height: ${cmpJobs.length * 3 + 18}rem`" class="rounded-md" />
    <VChart
      v-else
      :option="chartOpts"
      :style="`height: ${cmpJobs.length * 3 + 18}rem`"
      autoresize
    />
    <h2 class="text-lg font-bold">这些岗位的相关企业:</h2>
    <NSkeleton v-if="loading" :style="`height: ${cmpJobs.length * 2.5}rem`" class="rounded-sm" />
    <div v-for="{ jobName, companyList } of companies" :key="jobName" class="p-2">
      <span>{{ jobName }}：</span>
      <RouterView
        v-for="company of companyList"
        :key="company"
        :to="{
          name: 'company',
          params: {
            company
          }
        }"
      >
        <NTag type="success" :bordered="false" class="mx-1">{{ company }}</NTag>
      </RouterView>
    </div>
  </div>
  <NSkeleton v-else class="h-48 rounded-sm" />
</template>

<script setup lang="ts">
import { NSelect, type SelectOption, NButton, NTag, NSkeleton } from 'naive-ui'
import { type SalaryAnalysis, fetchSalaryCompareJob } from '@/api/data_analysis/salary'
import { fetchRelateJob, type RelateCompanies } from '@/api/recommand/company'
import { RouterView } from 'vue-router'
import { computed, ref } from 'vue'
import { BarChart } from 'echarts/charts'
import { use } from 'echarts/core'
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  type MarkAreaComponentOption,
  type MarkLineComponentOption,
  MarkAreaComponent,
  MarkLineComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import VChart from 'vue-echarts'
import { JOB_OPTS } from '../api/jobs'
use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  MarkLineComponent,
  MarkAreaComponent
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
const cmpJobs = ref<string[]>([])
const cmp = ref<SalaryAnalysis[]>([])
const companies = ref<RelateCompanies[]>([])
const loading = ref(false)
const cmpJobOpts = computed<SelectOption[]>(() => JOB_OPTS.filter((job) => job.value !== props.job))

const fetchData = async () => {
  loading.value = true
  const res = await Promise.all([
    fetchSalaryCompareJob({
      city: props.city,
      jobName: props.job,
      choiceList: cmpJobs.value
    }),
    fetchRelateJob({
      city: props.city,
      jobName: props.job,
      choiceList: cmpJobs.value
    })
  ])
  cmp.value = res[0]
  companies.value = res[1]
  loading.value = false
}

const chartOpts = computed<ChartOpts>(() => {
  const data = props.salaries ? [props.salaries, ...cmp.value] : []
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
          .map((item): [number, string] => [item.avgSalary, item.jobName])
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
          data: [[{ yAxis: props.job }, { yAxis: props.job }]]
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
          .map((item): [number, string] => [item.minSalary, item.jobName])
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
          data: [[{ yAxis: props.job }, { yAxis: props.job }]]
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
          .map((item): [number, string] => [item.maxSalary, item.jobName])
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
          data: [[{ yAxis: props.job }, { yAxis: props.job }]]
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
          .map((item): [number, string] => [item.jobNum, item.jobName])
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
          data: [[{ yAxis: props.job }, { yAxis: props.job }]]
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
  city: string
  salaries?: SalaryAnalysis
}
</script>
