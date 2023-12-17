<template>
  <div class="w-full h-full flex flex-col">
    <h2 class="text-2xl font-bold">职位行情</h2>
    <span class="text-lg pb-1">筛选</span>
    <div class="flex">
      <NSelect v-model:value="job" :options="jobOpts" class="inline w-24 p-2" placeholder="职位" />
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
    <h2 class="text-xl font-bold">比较</h2>
    <NTabs :default-value="''">
      <NTabPane name="相同职位不同城市">
        <SameJobDiffCities :job="job" :jobs="jobs" :city="city" :cities="cities" :data="data" />
      </NTabPane>
      <NTabPane name="相同城市不同职位">
        <SameCityDiffJobs :job="job" :jobs="jobs" :city="city" :cities="cities" :data="data" />
      </NTabPane>
    </NTabs>
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
import { NButton, NSelect, NTabPane, NTabs, type SelectOption } from 'naive-ui/lib'
import { ref, computed, onMounted } from 'vue'
import { type Company, fetchCities, fetchCompanies, fetchJobs } from '../api/mock'
import { type SalaryAnalysisResp } from '../api/data_analysis'
import { fetchCitySalaryAnalysis } from '../api/data_analysis'
import SameCityDiffJobs from '../components/same-city-diff-jobs.vue'
import SameJobDiffCities from '../components/same-job-diff-cities.vue'
import { BarChart } from 'echarts/charts'
import { use } from 'echarts/core'
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
use([GridComponent, BarChart, CanvasRenderer, TitleComponent, LegendComponent, TooltipComponent])
type ChartOpts = ComposeOption<
  GridComponentOption | BarSeriesOption | LegendComponentOption | TooltipComponentOption
>

const job = ref<string | undefined>()
const jobs = ref<string[]>([])
const city = ref<string | undefined>()
const cities = ref<string[]>([])
const companies = ref<Company[]>([])
const data = ref<SalaryAnalysisResp | undefined>()

onMounted(() => {
  fetchCities().then((ret) => (cities.value = ret))
  fetchJobs().then((ret) => (jobs.value = ret))
  fetchCompanies().then((ret) => (companies.value = ret))
})

const fetch = async () => {
  if (job.value !== undefined && city.value !== undefined) {
    data.value = await fetchCitySalaryAnalysis({
      city: city.value,
      jobName: job.value
    })
  } else {
    window.$message.warning('请选择职位和城市!')
  }
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

const chartOpts = computed<ChartOpts>(() => {
  return {
    xAxis: {},
    yAxis: {
      type: 'category',
      data: ['最少薪资', '平均薪资', '最多薪资', '岗位数量']
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
        data: data.value
          ? [data.value.minSalary, data.value.avgSalary, data.value.maxSalary, data.value.jobNum]
          : [],
        colorBy: 'data'
      }
    ]
  }
})
</script>
