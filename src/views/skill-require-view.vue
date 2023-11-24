<template>
  <div class="w-full h-full flex flex-col">
    <h2 class="text-2xl font-bold">技能需求</h2>
    <span class="text-lg">筛选</span>
    <div class="flex">
      <NSelect v-model:value="job" :options="jobs" class="inline w-24 p-2" placeholder="职位" />
      <NSelect v-model:value="city" :options="cities" class="inline w-24 p-2" placeholder="城市" />
      <NSelect v-model:value="area" :options="areas" class="inline w-24 p-2" placeholder="区域" />
    </div>
    <div class="flex py-2">
      <span class="text-2xl font-bold">学历需求</span><span class="grow" /><span>
        <NSwitch />
        仅查看当前城市 {{ city }} 市 {{ area }} 区
      </span>
    </div>
    <VChart :option="chartOpts" autoresize class="h-96" />
    <h2 class="text-2xl font-bold">
      <NTooltip>
        <template #trigger>
          <span>技能需求排名</span>
        </template>
        <template #default>
          <div class="flex flex-col">补充说明</div>
        </template>
      </NTooltip>
    </h2>
    <NDataTable :data="skillRequires" :columns="cols" />
  </div>
</template>

<script setup lang="ts">
import { NDataTable, NSelect, NSwitch, NTooltip, type SelectOption } from 'naive-ui/lib'
import { ref } from 'vue'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { PieSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption
} from 'echarts/components'
import VChart from 'vue-echarts'

use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

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
const city = ref<string | undefined>(undefined)
const area = ref<string | undefined>(undefined)

const skillRequires = [
  { name: 'Java', value: 0.2 },
  { name: 'Python', value: 0.2 },
  { name: 'C++', value: 0.15 },
  { name: 'C', value: 0.1 },
  { name: 'PHP', value: 0.1 },
  { name: 'JavaScript', value: 0.1 },
  { name: 'C#', value: 0.05 },
  { name: 'Go', value: 0.05 }
]

const cols = [
  { title: '名称', key: 'name' },
  { title: '比例', key: 'value' }
]
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
