<template>
  <div v-if="data !== undefined" class="sm:p-2 grow flex flex-col">
    <NCard
      class="bg-white shadow-sm"
      content-style="display: flex; align-items: center; gap: 0.25rem;"
    >
      <span class="font-bold text-lg">企业详情：</span>
      <NAvatar :src="data.logo" round size="small" />
      <span class="text-lg">{{ data.name }}</span>
      <span class="grow" />
      <NStatistic label="岗位数量" :value="data.jobCnt" class="inline-block">
        <template #suffix>
          <span>个</span>
        </template>
      </NStatistic>
    </NCard>
    <NCard class="grow bg-white mt-2 shadow-sm relative">
      <NTabs>
        <NTabPane name="基本情况">
          <h2>企业简介</h2>
          <p class="whitespace-pre-wrap">
            {{ data.description }}
          </p>
          <h2>工作时间及福利</h2>
          <div class="px-2 flex flex-col gap-2">
            <div class="flex items-center gap-4">
              <span class="icon-[ri--time-line]" /> {{ data.workTime }}
            </div>
            <div class="flex items-center gap-4">
              <span class="icon-[uil--favorite]" />
              <NTag v-for="welfare in data.welfare" :key="welfare" type="primary">{{
                welfare
              }}</NTag>
            </div>
          </div>
          <h2>相关连接</h2>
          <div>
            <span>招聘网址：</span>
            <a :href="data.url" class="text-cyan-950 hover:text-cyan-700">{{ data.url }}</a>
          </div>
        </NTabPane>
        <NTabPane name="技术需求">
          <VChart
            class="h-96"
            :option="pieOpts"
            autoresize
            @mousedown="({ name }) => gotoTechPage(name)"
          />
        </NTabPane>
        <NTabPane name="薪资情况">
          <VChart class="h-96" :option="barOpts" autoresize />
        </NTabPane>
      </NTabs>
      <span class="absolute left-4 bottom-2 text-gray-400"> 更新时间{{ data.updateTime }}</span>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { type CompanyInfo, fetchCompanyInfo } from '../../api/recommand/company_info'
import { NStatistic, NCard, NTabs, NTabPane, NTag, NAvatar } from 'naive-ui'
import { gotoTechPage } from '../../router'

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

const props = defineProps<Props>()
const data = ref<CompanyInfo>()

onBeforeMount(() => fetchCompanyInfo(props.company).then((ret) => (data.value = ret)))

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
      tooltip: {
        formatter: ({ value, name }) =>
          `技术: ${name}<br/>占比: ${((value as number) * 100).toFixed(2)}%`
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
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
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
            ],
      label: {
        show: true,
        formatter: ({ value }) => `${(value as [number, string])[0]}K`,
        color: '#ffffff'
      }
    }
  ]
}))
</script>

<script lang="ts">
interface Props {
  company: string
}
</script>
../../api/recommand
