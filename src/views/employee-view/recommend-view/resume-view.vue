<template>
  <div v-if="data === undefined" class="w-full h-full flex flex-col items-center justify-center">
    <span class="icon-[eos-icons--bubble-loading] text-4xl" />
  </div>
  <div v-else-if="data[0] === ResumeResultState.unfulfill">
    <div class="flex flex-col gap-4">
      <div>简历尚未填写未能给你生成个性化推荐请前往简历页填写信息</div>
      <div>
        <NButton type="error" @click="$router.push({ name: 'resume-profile' })">
          前往简历页
        </NButton>
      </div>
    </div>
  </div>
  <div v-else-if="data[0] === ResumeResultState.ambiguity">
    <span class="text-xl">您的简历未选择任何方向，我们为您做出了以下推荐</span>
    <div class="flex flex-col flex-wrap gap-8 mt-4">
      <JobIntro v-for="job of data[1]" :key="job" :job="job" />
    </div>
  </div>
  <div v-else class="flex flex-col items-center">
    <div class="text-xl w-full">
      您的简历选择了{{ data[1].map((item) => item.direction).join(',') }}等方向,
      以下是我们对你的匹配度分析
    </div>
    <Radar :rates="data[1]" class="w-96 h-96 lg:w-[30rem] lg:h-[30rem]" />
  </div>
</template>

<script setup lang="tsx">
import { type PropType, computed, defineComponent } from 'vue'
import { fetchResumeResult, MatchResult, ResumeResultState } from 'api/recommand/resume_result'
import { NButton } from 'naive-ui'
import JobIntro from 'components/job-intro.vue'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TitleComponent, PolarComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  PolarComponentOption,
  TooltipComponentOption
} from 'echarts/components'
import VChart from 'vue-echarts'
window.$message.info('正在加载数据, 加载数据可能需要一些时间，请耐心等待', {
  duration: 5000
})
use([TitleComponent, PolarComponent, TooltipComponent, BarChart, CanvasRenderer])

const data = await fetchResumeResult()
</script>

<script lang="tsx">
type EChartsOption = ComposeOption<
  TitleComponentOption | PolarComponentOption | TooltipComponentOption | BarSeriesOption
>

const Radar = defineComponent({
  props: {
    res: {
      type: Object as PropType<MatchResult>,
      required: true
    }
  },
  setup: (props) => {
    const opts = computed<EChartsOption>(() => ({
      polar: {
        radius: [30, '80%']
      },
      angleAxis: {
        max: 1,
        startAngle: 75
      },
      radiusAxis: {
        type: 'category',
        data: props.res.map((_) => _.direction)
      },
      tooltip: {},
      series: {
        type: 'bar',
        data: props.res.map((_) => _.score),
        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'middle',
          formatter: '{b}: {c}'
        },
        colorBy: 'series'
      }
    }))
    return () => <VChart option={opts.value} autoresize />
  }
})

const matchText = ['不匹配', '一般', '还算匹配', '匹配', '非常匹配']
</script>
