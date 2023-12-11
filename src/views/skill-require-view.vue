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
    <div class="flex py-2">
      <span class="text-2xl font-bold">学历需求</span><span class="grow" /><span>
        <NSwitch />
        仅查看 {{ city }} 市
      </span>
    </div>
    <VChart :option="chartOpts" class="h-96" autoresize />
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
import { NSelect, NSwitch, NTooltip, type SelectOption } from 'naive-ui/lib'
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

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  GridComponent,
  BarChart
])

type EChartsOption = ComposeOption<
  TitleComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption
>

const chartOpts: EChartsOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 0.66, name: '大专' },
        { value: 0.2, name: '本科' },
        { value: 0.14, name: '硕士' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

const job = ref<string | undefined>(undefined)
const city = ref<string>('北京')
const toCmpOpts = computed<SelectOption[]>(() =>
  ['全国'].concat(cities.filter((item) => item !== city.value)).map((item) => ({
    label: item,
    value: item
  }))
)
const toCmp = ref<string>('全国')
const data = ref<[string, number][][]>([[], []])
watch(toCmp, async () => {
  data.value[0] = await fetch()
})
watch(city, async () => {
  data.value[1] = await fetch()
})

const fetch = async (): Promise<[string, number][]> => {
  window.$loading.start()
  return new Promise((resolve) => {
    setTimeout(() => {
      window.$loading.finish()
      resolve(rand())
    }, 100)
  })
}

const rand = (): [string, number][] => {
  //从pool中随机选出10个技能， 并给出比例
  const len = skillRequirePool.length
  const res: [string, number][] = []
  const used = new Set<number>()
  for (let i = 0; i < 10; i++) {
    let idx = Math.floor(Math.random() * len)
    while (used.has(idx)) {
      idx = Math.floor(Math.random() * len)
    }
    used.add(idx)
    res.push([skillRequirePool[idx], Math.random() * 100 + 1])
  }
  let sum = res.reduce((acc, cur) => acc + cur[1], 0)
  res.forEach((item) => {
    item[1] = item[1] / sum
  })
  return res.sort((a, b) => b[1] - a[1])
}

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
      name: `${toCmp.value}市${job.value}岗位技能需求`
    },
    {
      gridIndex: 1,
      type: 'value',
      name: `${city.value}市${job.value}岗位技能需求`
    }
  ],
  xAxis: [
    { gridIndex: 0, type: 'category', show: false, data: data.value[0].map(([name, _]) => name) },
    { gridIndex: 1, type: 'category', show: false, data: data.value[1].map(([name, _]) => name) }
  ],
  grid: [{ top: '50%' }, { bottom: '50%' }],
  series: [
    {
      type: 'bar',
      data: data.value[0].map(([name, value]) => ({
        name,
        value,
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
      data: data.value[1].map(([name, value]) => ({
        name,
        value,
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

onMounted(async () => {
  data.value = await Promise.all([fetch(), fetch()])
})
</script>

<script lang="ts">
const jobs = [
  '后端',
  '前端',
  '全栈',
  '测试',
  '运维',
  '产品',
  'UI',
  '运营',
  '市场',
  '销售',
  '人事',
  '行政',
  '财务',
  '法务',
  '其他'
]
const cities = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '温州',
  '苏州',
  '南京',
  '成都',
  '武汉',
  '西安'
]

const cityOpts: SelectOption[] = cities.map((city) => ({
  label: city,
  value: city
}))
const jobOpts: SelectOption[] = jobs.map((job) => ({
  label: job,
  value: job
}))

const skillRequirePool = [
  'java',
  'python',
  'c++',
  'c',
  'php',
  'javascript',
  'c#',
  'go',
  'html',
  'css',
  'mysql',
  'linux',
  'vue',
  'react',
  'spring',
  'springboot',
  'django',
  'flask',
  'jquery',
  'bootstrap',
  'nodejs',
  'typescript',
  'redis',
  'mongodb',
  'rust',
  'oracle',
  'sqlserver',
  'mysql',
  'postgresql',
  'docker',
  'kubernetes',
  'nginx',
  'tomcat',
  'apache',
  'git',
  'svn',
  'maven',
  'gradle',
  'jvm'
]
</script>

<style lang="scss" scoped>
#cmp {
  height: 36rem;
}
</style>
