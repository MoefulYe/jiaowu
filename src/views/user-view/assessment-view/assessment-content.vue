<template>
  <div>
    <div
      class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8"
      v-if="step !== 13"
    >
      <h2 class="text-2xl mb-8">{{ questions[step].title }}</h2>
      <div class="flex flex-col gap-4 items-center">
        <div
          v-for="(content, idx) in questions[step].content"
          :key="idx"
          :id="`${idx}`"
          class="flex flex-col items-center gap-2"
        >
          <div>
            {{ `${step * 10 + idx + 1}. ${content}` }}
          </div>
          <EmojiRadio v-model="answers[step * 10 + idx]" :tips="tips" />
        </div>
      </div>
      <div class="flex gap-2">
        <NButton @click="prev">上一页</NButton>
        <NButton @click="step++">下一页</NButton>
        <NSelect
          :options="
            jobs.map((label, value) => ({ label, value })).concat({ label: '检查', value: 13 })
          "
          v-model:value="step"
          class="w-24"
        />
        <NButton @click="step = 13">检查</NButton>
      </div>
    </div>
    <div
      class="max-w-[85rem] mx-auto sm:px-6 lg:px-8 flex flex-col items-center gap-8"
      v-else-if="step === 13"
    >
      <h2 class="text-4xl">答题情况</h2>
      <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
        <NTooltip v-for="(answer, idx) in answers" :key="idx">
          <template #trigger>
            <span
              :class="[
                icon(answer),
                'text-4xl hover:-translate-y-4 hover:scale-125 transition-transform delay-150 ease-in-out cursor-pointer'
              ]"
              @click="step = Math.floor(idx / 10)"
            />
          </template>
          <template #default>
            {{ tooltip(answer) }}
          </template>
        </NTooltip>
      </div>
      <NButton @click="submit">提交</NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import EmojiRadio, { Score, emojiFill } from '../../../components/emoji-radio.vue'
import { NButton, NSelect, NTooltip } from 'naive-ui'
import confirm from '../../../components/confirm'
import { jobs } from '../../../api/mock'

const emit = defineEmits<{
  done: [scores: number[]]
}>()
const progress = defineModel<number>('progress', { required: true })
const answers = ref<Answer[]>(Array.from({ length: 130 }))
const step = ref<number>(0)
watch(step, () => (progress.value = 9 + step.value * 7))

const prev = () => {
  if (step.value === 0) {
    window.$message.warning('没有上一页')
  } else {
    step.value--
  }
}
const icon = (score?: number) =>
  score !== undefined ? `${emojiFill(score)} text-yellow-400` : 'icon-[bi--emoji-tear]'
const tips = ['很不符合', '不符合', '一般', '符合', '很符合']
const tooltip = (score?: number) => (score !== undefined ? tips[score - 1] : '未填写')

const submit = async () => {
  if (answers.value.some((answer) => answer === undefined)) {
    window.$message.warning('请填写完所有问题')
    return
  }
  if (await confirm('提交', '确认提交吗？🤔', 'info')) {
    const result = scores(answers.value as number[])
    emit('done', result)
  }
}

const scores = (answers: number[]): number[] => {
  const result = Array.from({ length: 13 }, () => 0)
  for (let i = 0; i < 130; i++) {
    result[Math.floor(i / 10)] += answers[i]!
  }
  return result
}
</script>

<script lang="ts">
type Answer = Score | undefined

const questions = [
  [
    '你对深度学习的基本概念和原理有何了解？',
    '你熟悉常用的深度学习框架（如TensorFlow、PyTorch、Keras等）吗？',
    '你有使用深度学习解决自然语言处理、计算机视觉等问题的经验吗？',
    '你有进行深度学习模型部署和优化的经验吗？',
    '你有使用深度学习框架进行图像生成、强化学习等任务的经验吗？'
  ],
  [
    '你对机器学习的基本概念和原理有何了解？',
    '你熟悉常用的机器学习算法（如线性回归、决策树、支持向量机等）吗？',
    '你有使用机器学习工具和库（如Scikit-learn、TensorFlow、PyTorch等）的经验吗？',
    '你熟悉深度学习算法和神经网络吗？',
    '你有使用机器学习解决实际业务问题的经验吗？'
  ],
  [
    '你对产品经理的角色和责任有多少了解？',
    '你了解产品设计原则和方法吗？',
    '你有使用原型工具进行产品设计的经验吗？',
    '你了解产品分析和数据驱动的方法吗？',
    '你了解产品上线和迭代的流程吗？'
  ],
  [
    '你对前端开发有多少了解？',
    '你有使用前端框架的经验吗？',
    '你了解跨浏览器兼容性的挑战吗？',
    '你有关于前端安全性的了解吗？',
    '你在团队中如何协作进行前端开发？'
  ],
  [
    '你对后端开发有多少了解？',
    '你对数据库操作有多少经验？',
    '你了解后端系统的安全性吗？',
    '你知道如何处理后端系统的故障排除和监控吗？',
    '你有分布式系统方面的了解吗？'
  ],
  [
    '你对软件测试的理解程度如何？',
    '你了解测试方法论，如黑盒测试和白盒测试吗？',
    '你了解自动化测试的概念和工具吗？',
    '你在团队中如何协作进行软件测试？',
    '你有关于软件质量保证的了解吗？'
  ],
  [
    '你对操作系统有多少了解？',
    '你有使用命令行工具管理系统的经验吗？',
    '你有配置和维护服务器的经验吗？',
    '你了解自动化部署和配置管理工具吗，比如Ansible、Chef等？',
    '你有关于系统安全性的了解吗？'
  ],
  [
    '你对互联网运营的理解程度如何？',
    '你了解用户增长和用户留存的方法吗？',
    '你了解社交媒体运营和内容营销吗？',
    '你了解SEO和SEM的基本原理吗？',
    '你知道如何进行用户反馈收集和处理吗？'
  ],
  [
    '你对销售领域的理解程度如何？',
    '你了解销售技巧和沟通能力的重要性吗？',
    '你在客户关系管理方面有哪些经验？',
    '你有使用销售工具和CRM系统的经验吗？',
    '你知道如何处理客户异议和投诉吗？'
  ]
]
</script>
