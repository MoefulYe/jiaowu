<template>
  <div v-if="data === undefined" class="w-full h-full flex flex-col items-center justify-center">
    <span class="icon-[eos-icons--bubble-loading] text-4xl" />
  </div>
  <div v-else-if="data.state === 'unfulfill'">
    <div class="flex flex-col gap-4">
      <div>简历尚未填写未能给你生成个性化推荐请前往简历页填写信息</div>
      <div>
        <NButton type="error" @click="$router.push({ name: 'resume-profile' })">
          前往简历页
        </NButton>
      </div>
    </div>
  </div>
  <div v-else-if="data.state === 'ambiguity'">
    <span class="text-xl">您的简历未选择任何方向，我们为您做出了以下推荐</span>
    <div class="flex flex-col flex-wrap gap-8 mt-4">
      <JobIntro v-for="job of data.recommend" :key="job" :job="job" />
    </div>
  </div>
  <div v-else class="flex flex-col items-center">
    <div class="text-xl w-full">
      您的简历选择了{{ data.rates.map((rate) => rate.job).join(',') }}等方向,
      以下是我们对你的匹配度分析
    </div>
    <Radar :rates="data.rates" class="w-96 h-96 lg:w-[30rem] lg:h-[30rem]" />
  </div>
</template>

<script setup lang="tsx">
import { PropType, computed, defineComponent, ref } from 'vue'
import { Rate, ResumeResult } from '../../../api/recommand/resume_result'
import { NButton } from 'naive-ui'
import JobIntro from '../../../components/job-intro.vue'
// import { JOBS } from '../../../api/jobs'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  type TitleComponentOption,
  LegendComponent,
  type LegendComponentOption,
  TooltipComponent,
  type TooltipComponentOption
} from 'echarts/components'
import { RadarChart, type RadarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { JOBS } from '../../../api/jobs'
echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, TooltipComponent])

// const data = ref<ResumeResult>()
// const data = ref<ResumeResult>({ state: 'ambiguity', recommend: JOBS.slice(1, 5) })
// const data = ref<ResumeResult>({ state: 'unfulfill' })
const data = ref<ResumeResult>({
  state: 'match',
  rates: JOBS.slice(0, 3).map((job) => ({
    job,
    matchSkills: ['a'],
    score: 1
  }))
})
</script>

<script lang="tsx">
type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption | TooltipComponentOption
>

const Radar = defineComponent({
  props: {
    rates: {
      type: Object as PropType<Rate[]>,
      required: true
    }
  },
  setup: (props) => {
    const opts = computed<EChartsOption>(() => ({
      radar: {
        indicator: props.rates.map((rate) => ({ name: rate.job, max: 5, min: 0 }))
      },
      series: {
        type: 'radar',
        data: [{ value: props.rates.map((rate) => rate.score) }],
        symbol: 'none',
        name: '匹配度',
        tooltip: {
          formatter: () =>
            props.rates
              .map(({ job, score }) => `${job}: ${matchText[Math.floor(score - 1)]}`)
              .join(' ')
        }
      },
      tooltip: {}
    }))
    return () => <VChart option={opts.value} autoresize />
  }
})

const matchText = ['不匹配', '一般', '还算匹配', '匹配', '非常匹配']
</script>
