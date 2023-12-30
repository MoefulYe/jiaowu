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
      <NButton class="inline m-2" @click="fetchData">确认</NButton>
    </div>
    <div v-if="data !== undefined" class="p-2">
      <VChart :option="options" style="height: 24rem" autoresize />
    </div>
    <h2 class="text-xl font-bold">比较</h2>
    <NTabs :default-value="''">
      <NTabPane name="相同职位不同城市">
        <SameJobDiffCities :job="job" :jobs="jobs" :city="city" :cities="cities" :data="data" />
      </NTabPane>
      <NTabPane name="相同城市不同职位">
        <SameCityDiffJobs :job="job" :jobs="jobs" :city="city" :cities="cities" :data="data" />
      </NTabPane>
    </NTabs>
  </div>
</template>

<script setup lang="ts">
import { NSelect, NButton, type SelectOption, NTabs, NTabPane } from 'naive-ui/lib'
import { computed, onMounted, ref } from 'vue'
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
import { fetchCities, fetchJobs } from '../../../api/mock'
import { fetchCityTechAnalysis, type TechAnalysisResp } from '../../../api/data_analysis'
import { type ComposeOption } from 'echarts'
import SameCityDiffJobs from '../../../components/same-city-diff-jobs-top10.vue'
import SameJobDiffCities from '../../../components/same-job-diff-cities-top10.vue'

use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])
type ChartOpts = ComposeOption<
  PieSeriesOption | TitleComponentOption | TooltipComponentOption | LegendComponentOption
>

const jobs = ref<string[]>([])
const cities = ref<string[]>([])
const job = ref<string | undefined>()
const city = ref<string | undefined>()
const data = ref<TechAnalysisResp | undefined>()

const cityOpts = computed<SelectOption[]>(() =>
  cities.value.map((city) => ({
    label: city,
    value: city
  }))
)
const jobOpts = computed<SelectOption[]>(() =>
  jobs.value.map((job) => ({
    label: job,
    value: job
  }))
)
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
    data: data.value?.techRate.map(({ tech, rate }) => ({ value: rate, name: tech }))
  }
}))

const fetchData = async () => {
  if (city.value !== undefined && job.value !== undefined) {
    data.value = await fetchCityTechAnalysis({
      city: city.value,
      tech: job.value
    })
  } else {
    window.$message.warning('请选择岗位和城市')
  }
}

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

<script lang="ts"></script>
