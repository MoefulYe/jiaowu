<template>
  <div class="sm:p-2 grow flex flex-col">
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
            <span class="icon-[flowbite--bars-from-left-outline]" />
            职业行情
          </span>
        </NBreadcrumbItem>
      </NBreadcrumb>
      <div class="grow flex flex-col">
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
          <NButton
            class="inline m-2"
            @click="
              () => {
                companies = undefined
                salaries = undefined
                fetch()
              }
            "
            >确认</NButton
          >
        </div>
        <NSkeleton v-if="salaries === undefined" class="h-64 rounded-md" />
        <VChart v-else :option="chartOpts" class="h-64" autoresize />
        <h2 class="text-2xl font-bold">相关企业</h2>
        <NSkeleton v-if="companies === undefined" class="rounded-sm h-6" text />
        <div v-else>
          <span v-for="company of companies" :key="company">
            <RouterLink
              :to="{
                name: 'company',
                params: {
                  company
                }
              }"
            >
              <NTag :bordered="false" type="success" class="mx-2">
                {{ company }}
              </NTag>
            </RouterLink>
          </span>
        </div>
        <h2 class="text-2xl font-bold">相关岗位</h2>
        <NSkeleton v-if="companies === undefined" class="rounded-sm h-16" text />
        <NDataTable v-else :data="岗位" :columns="cols" />
        <h2 class="text-xl font-bold">比较</h2>
        <NTabs :default-value="''">
          <NTabPane name="相同职位不同城市">
            <SameJobDiffCities :job="job" :city="city" :salaries="salaries" />
          </NTabPane>
          <NTabPane name="相同城市不同职位">
            <SameCityDiffJobs :job="job" :city="city" :salaries="salaries" />
          </NTabPane>
        </NTabs>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="tsx">
import {
  NButton,
  NSelect,
  NTabPane,
  NTabs,
  NCard,
  NSkeleton,
  NTag,
  NBreadcrumbItem,
  NBreadcrumb,
  NDataTable,
  type DataTableColumns
} from 'naive-ui'
import { ref, computed, onBeforeMount } from 'vue'
import { CITY_OPTS, DEFAULT_CITY } from '@/api/city'
import { JOB_OPTS, DEFAULT_JOB } from '@/api/jobs'
import { 岗位 } from '@/api/recommand/company'
import { type SalaryAnalysis, fetchSalaryInitalChoice } from '@/api/data_analysis/salary'
import SameCityDiffJobs from '@/components/same-city-diff-jobs-salary.vue'
import SameJobDiffCities from '@/components/same-job-diff-cities-salary.vue'
import { BarChart } from 'echarts/charts'
import { use } from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  type GridComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import VChart from 'vue-echarts'
import { RouterLink } from 'vue-router'
import { fetchInitialChoice as fetchCompanyInitialChoice } from '@/api/recommand/company'
use([GridComponent, BarChart, CanvasRenderer, LegendComponent, TooltipComponent])
type ChartOpts = ComposeOption<
  GridComponentOption | BarSeriesOption | LegendComponentOption | TooltipComponentOption
>

const job = ref(DEFAULT_JOB)
const city = ref(DEFAULT_CITY)
const companies = ref<string[]>()
const salaries = ref<SalaryAnalysis>()

const fetch = () => {
  fetchCompanyInitialChoice({
    jobName: job.value,
    city: city.value
  }).then((ok) => (companies.value = ok.companyList))
  fetchSalaryInitalChoice({
    city: city.value,
    jobName: job.value
  }).then((ok) => (salaries.value = ok))
}

onBeforeMount(fetch)

const chartOpts = computed<ChartOpts>(() => ({
  grid: [
    { bottom: '71%', top: '8%' },
    { top: '29%', bottom: '8%' }
  ],
  xAxis: [
    {
      name: '岗位数量',
      position: 'top',
      gridIndex: 0,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    {
      name: '岗位薪资',
      axisLabel: {
        formatter: '{value}K'
      },
      position: 'bottom',
      gridIndex: 1,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      data: ['岗位数量'],
      gridIndex: 0
    },
    {
      type: 'category',
      data: ['最少薪资', '平均薪资', '最多薪资'],
      gridIndex: 1
    }
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
      data: salaries.value ? [salaries.value.jobNum] : undefined,
      xAxisIndex: 0,
      yAxisIndex: 0,
      color: '#d08770',
      label: {
        show: true,
        formatter: ({ value }) => `${value}`,
        color: '#F7FAFF'
      }
    },
    {
      type: 'bar',
      data: salaries.value
        ? [salaries.value.minSalary, salaries.value.avgSalary, salaries.value.maxSalary]
        : [],
      xAxisIndex: 1,
      yAxisIndex: 1,
      colorBy: 'data',
      tooltip: {
        valueFormatter: (value) => `${value}K`
      },
      label: {
        show: true,
        formatter: ({ value }) => `${value}K`,
        color: '#F7FAFF'
      }
    }
  ]
}))

const cols: DataTableColumns<(typeof 岗位)[number]> = [
  { title: '公司', key: 'company', rowSpan: ({ rowSpan }) => rowSpan ?? 1, width: '8rem' },
  {
    title: '岗位',
    key: 'job',
    render: ({ url, job }) => (
      <a
        href={url}
        target="_blank"
        class="text-blue-500 inline-block mx-auto text-[#434c5e] hover:text-[#88c0d0]"
      >
        {job}
      </a>
    )
  }
]
</script>
