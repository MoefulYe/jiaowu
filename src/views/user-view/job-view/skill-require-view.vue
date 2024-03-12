<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-none sm:rounded-md">
      <div class="w-full h-full flex flex-col gap-2">
        <h2 class="text-2xl font-bold">技能需求</h2>
        <span class="text-lg">筛选</span>
        <div class="flex">
          <NSelect
            v-model:value="job"
            :options="JOB_OPTS"
            class="inline w-24 p-2"
            placeholder="职位"
          />
          <NSelect
            v-model:value="city"
            :options="CITY_OPTS"
            class="inline w-24 p-2"
            placeholder="城市"
          />
          <NButton class="inline m-2" @click="fetchData">确认</NButton>
        </div>
        <VChart
          v-if="data !== undefined"
          :option="options"
          class="h-96"
          autoresize
          @mousedown="({ name }) => gotoTechPage(name)"
        />
        <NSkeleton v-else class="h-96 rounded-md" />
        <h2 class="text-xl font-bold">比较</h2>
        <NTabs default-value="">
          <NTabPane name="相同职位不同城市">
            <SameJobDiffCities :job="job" :city="city" :rate="data" />
          </NTabPane>
          <NTabPane name="相同城市不同职位">
            <SameCityDiffJobs :job="job" :city="city" :rate="data" />
          </NTabPane>
        </NTabs>
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NSelect, NButton, NTabs, NTabPane } from 'naive-ui/lib'
import { computed, onBeforeMount, ref } from 'vue'
import { use } from 'echarts/core'
import { PieChart, type PieSeriesOption } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  type TitleComponentOption,
  type TooltipComponentOption,
  type LegendComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { cities, jobs } from '../../../api/mock'
import { fetchTechInitialChoice, type Tech } from '../../../api/data_analysis/tech'
import { type ComposeOption } from 'echarts'
import SameCityDiffJobs from '../../../components/same-city-diff-jobs-top10.vue'
import SameJobDiffCities from '../../../components/same-job-diff-cities-top10.vue'
import { gotoTechPage } from '../../../router'
import { DEFAULT_JOB, JOB_OPTS } from '../../../api/jobs'
import { CITY_OPTS, DEFAULT_CITY } from '../../../api/city'
import { NSkeleton } from 'naive-ui'

use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])
type ChartOpts = ComposeOption<
  PieSeriesOption | TitleComponentOption | TooltipComponentOption | LegendComponentOption
>

const job = ref(DEFAULT_JOB)
const city = ref(DEFAULT_CITY)
const data = ref<Tech>()

const options = computed<ChartOpts>(() => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {},
  series: {
    type: 'pie',
    radius: [20, 140],
    center: ['50%', '75%'],
    roseType: 'radius',
    itemStyle: {
      borderRadius: 5
    },
    label: {
      show: true,
      color: '#4c566a',
      formatter: ({ name, value }) => `${name} ${((value as number) * 100).toFixed(2)}%`
    },
    tooltip: {
      formatter: ({ name, value }) => `${name} ${((value as number) * 100).toFixed(2)}%`
    },
    data: data.value?.techRateList.map(({ techName, rate }) => ({ value: rate, name: techName }))
  }
}))

const fetchData = () =>
  fetchTechInitialChoice({
    city: city.value,
    jobName: job.value
  }).then((ok) => (data.value = ok))

onBeforeMount(fetchData)
</script>

<style lang="scss" scoped>
#cmp {
  height: 36rem;
}
</style>

<script lang="ts"></script>
