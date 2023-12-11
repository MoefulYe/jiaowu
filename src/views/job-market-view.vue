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
    <NSelect
      v-model:value="toCmp"
      :options="cmpOpts"
      class="inline p-2 w-96"
      placeholder="对比城市"
      multiple
    />
    <VChart :option="chartOpts" :style="`height: ${categories.length * 3 + 18}rem`" autoresize />
    <h2 class="text-2xl font-bold">相关企业</h2>
    <div>
      <span v-for="[company, url] in companies">
        <a class="text-slate-800 hover:text-sky-900 underline" :href="url">{{ company }}</a
        >，
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NSelect, type SelectOption } from 'naive-ui/lib'
import { ref, computed, onMounted, watch } from 'vue'
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

use([GridComponent, BarChart, CanvasRenderer, TitleComponent, LegendComponent, TooltipComponent])

type ChartOpts = ComposeOption<
  GridComponentOption | BarSeriesOption | LegendComponentOption | TooltipComponentOption
>

type Record = {
  area: string
  min: number
  mean: number
  max: number
}

const job = ref<string | undefined>(undefined)
const city = ref<string>('北京')
const toCmp = ref<string[]>([])
const data = ref<Record[]>([])
const categories = computed(() => ['全国', city.value, ...toCmp.value])
const companies = [
  ['华为', 'https://www.huawei.com'],
  ['阿里巴巴', 'https://www.alibaba.com'],
  ['腾讯', 'https://www.tencent.com'],
  ['字节跳动', 'https://www.bytedance.com'],
  ['百度', 'https://www.baidu.com'],
  ['京东', 'https://www.jd.com'],
  ['美团', 'https://www.meituan.com'],
  ['滴滴', 'https://www.didiglobal.com'],
  ['小米', 'https://www.mi.com'],
  ['网易', 'https://www.163.com'],
  ['携程', 'https://www.ctrip.com'],
  ['拼多多', 'https://www.pinduoduo.com'],
  ['360', 'https://www.360.com'],
  ['新浪', 'https://www.sina.com.cn']
]
watch(categories, () => fetch())

const cmpOpts = computed<SelectOption[]>(() =>
  cities.map((item) => ({
    label: item,
    value: item,
    disabled: item === city.value
  }))
)

const fetch = async () => {
  window.$loading.start()
  setTimeout(() => {
    data.value = categories.value.map((area) => {
      const bound1 = Math.floor(Math.random() * 10000) + 3000
      const bound2 = Math.floor(Math.random() * 10000) + 3000
      const max = Math.max(bound1, bound2)
      const min = Math.min(bound1, bound2)
      const mean = min + Math.floor(Math.random() * (max - min))
      return {
        area,
        min,
        mean,
        max
      }
    })
    window.$loading.finish()
  }, 100)
}

onMounted(() => {
  fetch()
})

const chartOpts = computed<ChartOpts>(() => ({
  xAxis: {},
  yAxis: {
    type: 'category',
    data: categories.value
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
      color: '#99FF33',
      data: data.value.map((item) =>
        item.area === city.value
          ? {
              value: item.min,
              itemStyle: {
                color: '#BA74F5'
              }
            }
          : {
              value: item.min
            }
      )
    },
    {
      type: 'bar',
      name: '平均薪资',
      color: '#66CCFF',
      data: data.value.map((item) =>
        item.area === city.value
          ? {
              value: item.mean,
              itemStyle: {
                color: '#F5567C'
              }
            }
          : {
              value: item.mean
            }
      )
    },
    {
      type: 'bar',
      name: '最多薪资',
      color: '#EAF500',
      data: data.value.map((item) =>
        item.area === city.value
          ? {
              value: item.max,
              itemStyle: {
                color: '#00FFCF'
              }
            }
          : {
              value: item.max
            }
      )
    }
  ]
}))
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
</script>
