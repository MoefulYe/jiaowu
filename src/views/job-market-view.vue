<template>
  <div class="w-full h-full flex flex-col">
    <h2 class="text-2xl font-bold">职位行情</h2>
    <span class="text-lg">筛选</span>
    <div class="flex">
      <NSelect v-model:value="job" :options="jobOpts" class="inline w-24 p-2" placeholder="职位" />
      <NSelect
        v-model:value="city"
        :options="cityOpts"
        class="inline w-24 p-2"
        placeholder="城市"
      />
    </div>
    <h2 class="text-2xl font-bold">薪资待遇</h2>
    <div class="flex">
      <NSelect
        v-model:value="toCmp"
        :options="cmpOpts"
        class="inline w-96 m-2"
        placeholder="对比城市"
        multiple
      />
      <NButton
        class="inline m-2"
        @click="
          () => {
            if (job !== undefined) {
              fetch(categories, job)
            }
          }
        "
        >更新</NButton
      >
    </div>
    <VChart
      :option="chartOpts"
      :style="`height: ${categories.length * 3 + 18}rem`"
      autoresize
      ref="chartRef"
    />
    <h2 class="text-2xl font-bold">相关企业</h2>
    <div>
      <span v-for="{ name, url } in companies">
        <a class="text-slate-800 hover:text-sky-900 underline" :href="url">{{ name }}</a
        >，
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NSelect, type SelectOption } from 'naive-ui/lib'
import { ref, computed, onMounted, shallowRef } from 'vue'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
  type TooltipComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import VChart from 'vue-echarts'
import { Company, fetchCities, fetchCompanies, fetchJobs } from '../api/mock'
import { SalaryAnalysisResp } from '../api/data_analysis'
import { fetchCitySalaryAnalysis, fetchCountrySalaryAnalysis } from '../api/data_analysis'

use([GridComponent, BarChart, CanvasRenderer, TitleComponent, LegendComponent, TooltipComponent])

type ChartOpts = ComposeOption<
  GridComponentOption | BarSeriesOption | LegendComponentOption | TooltipComponentOption
>

const chartRef = shallowRef(null)
const jobs = ref<string[]>([])
const cities = ref<string[]>([])
const companies = ref<Company[]>([])
const job = ref<string | undefined>()
const city = ref<string | undefined>()
const toCmp = ref<string[]>([])
const data = ref<SalaryAnalysisResp[]>([])

onMounted(() => {
  fetchCities().then((ret) => (cities.value = ret))
  fetchJobs().then((ret) => (jobs.value = ret))
  fetchCompanies().then((ret) => (companies.value = ret))
})

const fetch = async (regions: string[], job: string) => {
  data.value = await Promise.all(
    [
      fetchCountrySalaryAnalysis({
        jobName: job
      })
    ].concat(
      regions.map((region) =>
        fetchCitySalaryAnalysis({
          city: region,
          jobName: job
        })
      )
    )
  )
}

const jobOpts = computed<SelectOption[]>(() =>
  jobs.value.map((job) => ({
    label: job,
    value: job
  }))
)

const cityOpts = computed<SelectOption[]>(() =>
  cities.value.map((city) => ({
    label: city,
    value: city
  }))
)

const categories = computed(() => {
  let ret = []
  if (city.value != undefined) {
    ret.push(city.value)
  }
  ret = ret.concat(toCmp.value)
  return ret
})

const cmpOpts = computed<SelectOption[]>(() =>
  cities.value.map((entry) => ({
    label: entry,
    value: entry,
    disabled: entry === city.value
  }))
)

const chartOpts = computed<ChartOpts>(() => ({
  xAxis: {},
  yAxis: {
    type: 'category',
    data: ['全国'].concat(categories.value),
    axisPointer: {
      type: 'shadow',
      value: city.value,
      show: true,
      handle: {
        show: true
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  series: [
    {
      type: 'bar',
      name: '最少薪资',
      data: data.value.map((item) => item.minSalary)
    },
    {
      type: 'bar',
      name: '平均薪资',
      data: data.value.map((item) => item.avgSalary)
    },
    {
      type: 'bar',
      name: '最多薪资',
      data: data.value.map((item) => item.maxSalary)
    },
    {
      type: 'bar',
      name: '岗位数量',
      data: data.value.map((item) => item.jobNum)
    }
  ]
}))
</script>
