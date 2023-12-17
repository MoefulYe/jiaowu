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
</template>

<script setup lang="tsx">
import {
  type SalaryAnalysisResp,
  fetchCountrySalaryAnalysis,
  fetchCitySalaryAnalysis
} from '../api/data_analysis'
import { computed, onMounted, ref } from 'vue'
import { NSelect, type SelectOption, NButton } from 'naive-ui/lib'
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

const props = defineProps<Props>()
const cmpCities = ref<string[]>([])
const cmp = ref<SalaryAnalysisResp[]>([])
const cmpCityOpts = computed<SelectOption[]>(() =>
  props.cities
    .filter((city) => city !== props.city)
    .map((city) => ({
      value: city,
      label: city
    }))
)

const fetchData = async () => {
  if (props.city !== undefined && props.job !== undefined) {
    cmp.value = await Promise.all(
      [
        fetchCountrySalaryAnalysis({
          jobName: props.job
        })
      ].concat(
        cmpCities.value.map((city) =>
          fetchCitySalaryAnalysis({
            jobName: props.job!,
            city
          })
        )
      )
    )
  } else {
    window.$message.warning('未选择职位和城市')
  }
}

const chartOpts = computed<ChartOpts>(() => {
  const categories = props.city ? [props.city, '全国', ...cmpCities.value] : []
  const data = props.data ? [props.data, ...cmp.value] : []
  return {
    xAxis: {},
    yAxis: {
      type: 'category',
      data: categories,
      axisPointer: {
        type: 'shadow',
        value: props.city,
        show: true,
        handle: {
          show: true,
          size: 20
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
        data: data.map((item) => item.minSalary)
      },
      {
        type: 'bar',
        name: '平均薪资',
        data: data.map((item) => item.avgSalary)
      },
      {
        type: 'bar',
        name: '最多薪资',
        data: data.map((item) => item.maxSalary)
      },
      {
        type: 'bar',
        name: '岗位数量',
        data: data.map((item) => item.jobNum)
      }
    ]
  }
})

onMounted(() => {
  fetchData()
})
</script>

<script lang="tsx">
interface Props {
  job?: string
  jobs: string[]
  city?: string
  cities: string[]
  data?: SalaryAnalysisResp
}
</script>
