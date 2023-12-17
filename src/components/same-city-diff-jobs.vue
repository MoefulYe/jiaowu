<template>
  <h2 class="text-xl font-bold">同一城市不同岗位对比</h2>
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
  <VChart :option="chartOpts" :style="`height: ${cmpJobs.length * 3 + 18}rem`" autoresize />
</template>

<script setup lang="tsx">
import { type SalaryAnalysisResp, fetchCitySalaryAnalysis } from '../api/data_analysis'
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
const cmpJobs = ref<string[]>([])
const cmp = ref<SalaryAnalysisResp[]>([])
const cmpJobOpts = computed<SelectOption[]>(() =>
  props.jobs
    .filter((job) => job !== props.job)
    .map((job) => ({
      value: job,
      label: job
    }))
)

const fetchData = async () => {
  if (props.city !== undefined && props.job !== undefined) {
    cmp.value = await Promise.all(
      cmpJobs.value.map((job) =>
        fetchCitySalaryAnalysis({
          city: props.city!,
          jobName: job
        })
      )
    )
  } else {
    window.$message.warning('未选择职位和城市')
  }
}

const chartOpts = computed<ChartOpts>(() => {
  const categories = props.job ? [props.job, ...cmpJobs.value] : []
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
