<template>
  <div v-if="data !== undefined">
    <h2>企业详情</h2>
    <div class="flex">
      <span class="inline">
        <div class="flex flex-col space-y-4">
          <div class="flex flex-row space-x-4">
            <div class="flex flex-col space-y-2">
              <div class="flex flex-row space-x-2">
                <span class="font-bold">企业名称：</span>
                <span>{{ data.name }}</span>
              </div>
              <div class="flex flex-row space-x-2">
                <span class="font-bold">企业网址：</span>
                <a :href="data.url" class="text-cyan-950 hover:text-cyan-700">{{ data.url }}</a>
              </div>
              <div class="flex flex-row space-x-2">
                <span class="font-bold">招聘网址：</span>
                <a :href="data.recruitUrl" class="text-cyan-950 hover:text-cyan-700">{{
                  data.recruitUrl
                }}</a>
              </div>
              <div class="flex flex-row space-x-2">
                <span class="font-bold">公司简介：</span>
              </div>
              <p>{{ data.description }}</p>
            </div>
          </div>
        </div>
      </span>
      <span class="ml-24">
        <NStatistic label="岗位数量" :value="data.jobCnt">
          <template #prefix>
            <NIcon>
              <IdcardOutlined />
            </NIcon>
          </template>
          <template #suffix>
            <span>个</span>
          </template>
        </NStatistic>
      </span>
    </div>
    <div class="flex mt-16">
      <VChart class="h-72 grow" :option="pieOpts" autoresize />
      <VChart class="h-72 grow" :option="barOpts" autoresize />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CompanyInfo, fetchCompanyInfo } from '../../api/company'
import { NIcon, NStatistic } from 'naive-ui'
import { IdcardOutlined } from '@vicons/antd'

import { BarChart, PieChart } from 'echarts/charts'
import { use } from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  type GridComponentOption,
  TitleComponent,
  type TitleComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption, PieSeriesOption } from 'echarts/charts'
import VChart from 'vue-echarts'
use([
  GridComponent,
  PieChart,
  BarChart,
  CanvasRenderer,
  LegendComponent,
  TooltipComponent,
  TitleComponent
])
type ChartOpts = ComposeOption<
  | GridComponentOption
  | BarSeriesOption
  | LegendComponentOption
  | TooltipComponentOption
  | PieSeriesOption
  | TitleComponentOption
>

const company = useRoute().params.company as string
const data = ref<CompanyInfo>()
onMounted(() => fetchCompanyInfo(company).then((ret) => (data.value = ret)))

const pieOpts = computed<ChartOpts>(() => ({
  title: {
    text: '技术占比',
    left: 'center'
  },
  grid: [
    { left: '5%', width: '40%' },
    { right: '5%', width: '40%' }
  ],
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      type: 'pie',
      name: '技术占比',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: data.value?.tech
        .sort(({ rate: rateA }, { rate: rateB }) => rateA - rateB)
        .map((tech) => ({
          name: tech.name,
          value: tech.rate
        }))
    }
  ]
}))

const barOpts = computed<ChartOpts>(() => ({
  title: {
    text: '薪资分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  xAxis: {
    axisLabel: {
      formatter: '{value}K'
    }
  },
  yAxis: {
    type: 'category'
  },
  series: [
    {
      type: 'bar',
      name: '薪资分布',
      colorBy: 'data',
      data:
        data.value === undefined
          ? undefined
          : [
              [data.value.salary.min, '最少'],
              [data.value.salary.avg, '平均'],
              [data.value.salary.max, '最多']
            ]
    }
  ]
}))
</script>
