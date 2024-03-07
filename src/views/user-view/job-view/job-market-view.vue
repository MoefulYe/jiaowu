<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-none sm:rounded-md">
      <div class="grow flex flex-col">
        <h2 class="text-2xl font-bold">职位行情</h2>
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
          <NButton class="inline m-2" @click="fetch">确认</NButton>
        </div>
        <div v-if="data !== undefined" class="p-2">
          <VChart :option="chartOpts" style="height: 16rem" autoresize />
        </div>
        <h2 class="text-2xl font-bold">相关企业</h2>
        <div>
          <span v-for="company in companies" :key="company">
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
        <h2 class="text-xl font-bold">比较</h2>
        <NTabs :default-value="''">
          <NTabPane name="相同职位不同城市">
            <SameJobDiffCities :job="job" :jobs="jobs" :city="city" :cities="cities" :data="data" />
          </NTabPane>
          <NTabPane name="相同城市不同职位">
            <SameCityDiffJobs :job="job" :jobs="jobs" :city="city" :cities="cities" :data="data" />
          </NTabPane>
        </NTabs>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NButton, NSelect, NTabPane, NTabs, type SelectOption } from 'naive-ui/lib'
import { ref, computed, onBeforeMount } from 'vue'
import { cities, jobs } from '../../../api/mock'
import { type SalaryAnalysis, fetchSalaryInitalChoice } from '../../../api/data_analysis/salary'
import SameCityDiffJobs from '../../../components/same-city-diff-jobs-salary.vue'
import SameJobDiffCities from '../../../components/same-job-diff-cities-salary.vue'
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
import { NCard, NTag } from 'naive-ui'
import { fetchInitialChoice } from '../../../api/recommand/company'
use([GridComponent, BarChart, CanvasRenderer, LegendComponent, TooltipComponent])
type ChartOpts = ComposeOption<
  GridComponentOption | BarSeriesOption | LegendComponentOption | TooltipComponentOption
>

const job = ref<string>('java')
const city = ref<string>('杭州')
const companies = ref<string[]>([])
const data = ref<SalaryAnalysis>()

onBeforeMount(() => {
  fetchInitialChoice({
    jobName: job.value,
    city: city.value
  }).then((ok) => (companies.value = ok.companyList))
  fetch()
})

const fetch = () =>
  fetchSalaryInitalChoice({
    city: city.value,
    jobName: job.value
  }).then((ok) => (data.value = ok))

const jobOpts = computed<SelectOption[]>(() =>
  jobs.map((job) => ({
    label: job,
    value: job
  }))
)

const cityOpts = computed<SelectOption[]>(() =>
  cities.map((city) => ({
    label: city,
    value: city
  }))
)

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
      data: data.value ? [data.value.jobNum] : undefined,
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
      data: data.value ? [data.value.minSalary, data.value.avgSalary, data.value.maxSalary] : [],
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
</script>
