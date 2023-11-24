<template>
  <div class="w-full h-full flex flex-col">
    <h2 class="text-2xl font-bold">职位行情</h2>
    <span class="text-lg">筛选</span>
    <div class="flex">
      <NSelect v-model:value="job" :options="jobs" class="inline w-24 p-2" placeholder="职位" />
      <NSelect v-model:value="city" :options="cities" class="inline w-24 p-2" placeholder="城市" />
      <NSelect v-model:value="area" :options="areas" class="inline w-24 p-2" placeholder="区域" />
    </div>
    <h2 class="text-2xl font-bold">薪资待遇</h2>
    <div>平均薪资 {{ 114514 }} /年</div>
    <h2 class="text-2xl font-bold">所选职位在各城市的平均薪资</h2>
    <VChart :option="chartOpts" class="h-96" autoresize />
  </div>
</template>

<script setup lang="ts">
import { NSelect, SelectOption } from 'naive-ui/lib'
import { ref } from 'vue'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TitleComponent, TitleComponentOption } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import VChart from 'vue-echarts'

use([GridComponent, BarChart, CanvasRenderer, TitleComponent])

type EChartsOption = ComposeOption<GridComponentOption | BarSeriesOption | TitleComponentOption>

const chartOpts: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['北京', '上海', '广州', '深圳', '杭州', '温州', '苏州']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [
        40000,
        {
          value: 35000,
          itemStyle: {
            color: '#b48ead'
          }
        },
        32000,
        30000,
        20000,
        10000,
        100
      ],
      type: 'bar'
    }
  ]
}

const job = ref<string | undefined>(undefined)
const city = ref<string | undefined>(undefined)
const area = ref<string | undefined>(undefined)
</script>

<script lang="ts">
const jobs: SelectOption[] = [
  { label: '后端', value: '后端' },
  { label: '前端', value: '前端' },
  { label: '全栈', value: '全栈' },
  { label: '测试', value: '测试' },
  { label: '运维', value: '运维' },
  { label: '产品', value: '产品' },
  { label: 'UI', value: 'UI' },
  { label: '运营', value: '运营' },
  { label: '市场', value: '市场' },
  { label: '销售', value: '销售' },
  { label: '人事', value: '人事' },
  { label: '行政', value: '行政' },
  { label: '财务', value: '财务' },
  { label: '法务', value: '法务' },
  { label: '其他', value: '其他' }
]

const cities: SelectOption[] = [
  { label: '北京', value: '北京' },
  { label: '上海', value: '上海' },
  { label: '广州', value: '广州' },
  { label: '深圳', value: '深圳' },
  { label: '杭州', value: '杭州' }
]

const areas: SelectOption[] = [
  { label: '朝阳区', value: '朝阳区' },
  { label: '海淀区', value: '海淀区' },
  { label: '丰台区', value: '丰台区' },
  { label: '西城区', value: '西城区' },
  { label: '东城区', value: '东城区' },
  { label: '昌平区', value: '昌平区' },
  { label: '大兴区', value: '大兴区' },
  { label: '通州区', value: '通州区' },
  { label: '顺义区', value: '顺义区' },
  { label: '房山区', value: '房山区' },
  { label: '石景山区', value: '石景山区' },
  { label: '门头沟区', value: '门头沟区' },
  { label: '怀柔区', value: '怀柔区' },
  { label: '密云区', value: '密云区' },
  { label: '延庆区', value: '延庆区' },
  { label: '平谷区', value: '平谷区' },
  { label: '燕郊', value: '燕郊' },
  { label: '其他', value: '其他' }
]
</script>
