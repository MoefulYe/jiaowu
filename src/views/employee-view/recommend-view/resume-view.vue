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
  <div v-else class="flex flex-col items-center gap-4">
    <div class="text-xl w-full">
      您的简历选择了{{ data[1].map((item) => item.direction).join(',') }}等方向,
      基于你的简历我们对你做出了以下评估
    </div>
    <NDivider>
      <span class="text-lg"> 匹配度分析 </span>
    </NDivider>
    <Radar :res="data[1]" class="w-96 h-96 lg:w-[30rem] lg:h-[30rem]" />
    <NDivider>
      <span class="text-lg"> 如果你还想提升，我们建议... </span>
    </NDivider>
    <div
      v-for="({ direction, shortboardSkills, interpretation }, index) in data[1]"
      :key="index"
      class="w-full"
    >
      <NH3>{{ direction }}</NH3>
      <NP class="flex gap-2 items-center">
        如果你还想要提升你可能还要学习：
        <NTag v-for="skill in shortboardSkills" :key="skill" type="primary">
          {{ skill }}
        </NTag>
      </NP>
      <NH4> 提升建议 </NH4>
      <VueTypedJs
        :strings="[interpretation]"
        :type-speed="50"
        :loop="false"
        class="whitespace-pre-line"
      >
        <span class="typing"></span>
      </VueTypedJs>
      <NHr v-if="index !== data[1].length - 1" />
    </div>
    <NDivider>
      <span class="text-lg"> 为我们的推荐系统打分 </span>
    </NDivider>
    <NRate size="large">
      <template #default="{ index }">
        <NTooltip>
          <template #default>
            {{
              index > 2
                ? '你的评价是我们最大的动力'
                : index > 0
                ? '谢谢你的评价'
                : '你的评价将帮助我们更好的推荐'
            }}
          </template>
          <template #trigger>
            <span class="icon-[ph--star-fill]" />
          </template>
        </NTooltip>
      </template>
    </NRate>
    <NTooltip>
      <template #trigger>
        <NButton
          type="primary"
          class="mt-8"
          @click="
            $router.push({
              name: 'resume-profile'
            })
          "
        >
          <template #icon>
            <span class="icon-[ph--read-cv-logo]" />
          </template>
          修改简历
        </NButton>
      </template>
      <template #default> 修改简历让我们为你做出更好的推荐! </template>
    </NTooltip>
  </div>
</template>

<script setup lang="tsx">
import { type PropType, computed, defineComponent } from 'vue'
import {
  fetchResumeResult,
  type MatchResult,
  ResumeResultState
} from '@/api/recommand/resume_result'
import { NButton, NDivider, NH3, NHr, NRate, NTooltip, NP, NTag, NH4 } from 'naive-ui'
import JobIntro from '@/components/job-intro.vue'
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
import { VueTypedJs } from 'vue3-typed-ts'
window.$message.info('正在加载数据, 加载数据可能需要一些时间，请耐心等待')
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
      tooltip: {
        valueFormatter: (value) => {
          const idx = Math.floor((value as number) * 5)
          return matchText[idx > 4 ? 4 : idx]
        }
      },
      series: {
        type: 'bar',
        data: props.res.map((_) => _.score),
        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'middle',
          formatter: ({ value, name }) => {
            const idx = Math.floor((value as number) * 5)
            return `${name}: ${matchText[idx > 4 ? 4 : idx]}`
          },
          color: '#fff'
        },
        colorBy: 'data'
      }
    }))
    return () => <VChart option={opts.value} autoresize />
  }
})

const matchText = ['不太匹配', '一般', '还算匹配', '匹配', '非常匹配']
</script>
