<template>
  <div class="w-full h-full flex flex-col">
    <h2 class="text-2xl font-bold">技能需求</h2>
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
    <h2 class="text-2xl font-bold">技能需求</h2>
    <NTooltip>
      <template #trigger>
        <NSelect
          :options="toCmpOpts"
          v-model:value="toCmp"
          class="inline p-2 w-24"
          placeholder="比较"
        />
      </template>
      <template #default> 比较 </template>
    </NTooltip>
    <VChart id="cmp" :option="cmpChartOpts" autoresize />
  </div>
</template>

<script setup lang="ts">
import { NSelect, NTooltip, type SelectOption } from 'naive-ui/lib'
import { computed, onMounted, ref, watch } from 'vue'
import { use } from 'echarts/core'
import { PieChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { PieSeriesOption, BarSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption
} from 'echarts/components'
import VChart from 'vue-echarts'
import { fetchCities, fetchJobs } from '../api/mock'
import {
  TechAnalysisResp,
  fetchCityTechAnalysis,
  fetchCountryTechAnalysis
} from '../api/data_analysis'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  GridComponent,
  BarChart
])

const jobs = ref<string[]>([])
const cities = ref<string[]>([])
const job = ref<string | undefined>()
const city = ref<string | undefined>()
const toCmp = ref<string>('全国')
const data = ref<TechAnalysisResp | undefined>()
const toCmpData = ref<TechAnalysisResp | undefined>()

const fetchData = async () => {
  if (city.value !== undefined && job.value !== undefined) {
    data.value = await fetchCityTechAnalysis({
      tech: job.value,
      city: city.value
    })
  }
}

const fetchCmpData = async () => {
  if (job.value !== undefined) {
    if (toCmp.value === '全国') {
      toCmpData.value = await fetchCountryTechAnalysis({
        tech: job.value
      })
    } else {
      toCmpData.value = await fetchCityTechAnalysis({
        tech: job.value,
        city: toCmp.value
      })
    }
  }
}

watch([job, city], () => fetchData())
watch([job, toCmp], () => fetchCmpData())

const cityOpts = computed<SelectOption[]>(() =>
  cities.value.map((city) => ({ label: city, value: city }))
)
const jobOpts = computed<SelectOption[]>(() =>
  jobs.value.map((job) => ({ label: job, value: job }))
)
const toCmpOpts = computed<SelectOption[]>(() =>
  ['全国'].concat(cities.value.filter((item) => item !== city.value)).map((item) => ({
    label: item,
    value: item
  }))
)

interface RateEntry {
  name: string
  rate: number
}

const sortedData = computed<RateEntry[]>(() => {
  let ret: RateEntry[] = []
  data.value?.techRate.forEach((value, key) => {
    ret.push({ name: key, rate: value })
  })
  return ret.sort((a, b) => a.rate - b.rate)
})

const sortedCmpData = computed<RateEntry[]>(() => {
  let ret: RateEntry[] = []
  toCmpData.value?.techRate.forEach((value, key) => {
    ret.push({ name: key, rate: value })
  })
  return ret.sort((a, b) => a.rate - b.rate)
})

type CmpChartOpts = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GridComponentOption
  | BarSeriesOption
>

const cmpChartOpts = computed<CmpChartOpts>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  yAxis: [
    {
      gridIndex: 0,
      type: 'value',
      inverse: true,
      name: `${toCmp.value} ${job.value}岗位技能需求`
    },
    {
      gridIndex: 1,
      type: 'value',
      name: `${city.value} ${job.value}岗位技能需求`
    }
  ],
  xAxis: [
    {
      gridIndex: 0,
      type: 'category',
      show: false,
      data: sortedCmpData.value.map((item) => item.name)
    },
    { gridIndex: 1, type: 'category', show: false, data: sortedData.value.map((item) => item.name) }
  ],
  grid: [{ top: '50%' }, { bottom: '50%' }],
  series: [
    {
      type: 'bar',
      data: sortedCmpData.value.map(({ name, rate }) => ({
        name,
        value: rate,
        label: {
          show: true,
          color: 'inherit',
          formatter: (_) => name,
          position: 'bottom'
        }
      }))
    },
    {
      type: 'bar',
      data: sortedData.value.map(({ name, rate }) => ({
        name,
        value: rate,
        label: {
          show: true,
          color: 'inherit',
          formatter: (_) => name,
          position: 'top'
        }
      })),
      yAxisIndex: 1,
      xAxisIndex: 1
    }
  ]
}))

onMounted(() => {
  fetchCities().then((ret) => (cities.value = ret))
  fetchJobs().then((ret) => (jobs.value = ret))
})
</script>

<style lang="scss" scoped>
#cmp {
  height: 36rem;
}
</style>
