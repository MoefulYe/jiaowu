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
const step = ref<Direction | 检查页>(Direction.后端)
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
watch(step, () => (progress.value = 9 + step.value * 7))
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

type 检查页 = 13
const questions = [
  {
    title: '后端',
    content: [
      '你对后端开发有多少了解？',
      '你熟悉后端编程语言吗？',
      '你对数据库操作有多少经验？',
      '你理解RESTful API吗？',
      '你了解后端系统的安全性吗？',
      '你有关于性能优化的经验吗？',
      '你知道如何处理后端系统的故障排除和监控吗？',
      '你了解微服务架构吗？',
      '你在团队中如何协作进行后端开发？',
      '你有分布式系统方面的了解吗？'
    ]
  },
  {
    title: '前端',
    content: [
      '你对前端开发有多少了解？',
      '你熟悉前端编程语言吗？',
      '你有使用前端框架的经验吗？',
      '你了解前端性能优化的方法吗？',
      '你了解跨浏览器兼容性的挑战吗？',
      '你知道如何进行前端界面设计吗？',
      '你有关于前端安全性的了解吗？',
      '你知道如何与后端协作进行前后端集成吗？',
      '你在团队中如何协作进行前端开发？',
      '你了解单页面应用（SPA）的概念吗？'
    ]
  },
  {
    title: '全栈',
    content: [
      '你对前端开发有多少了解？',
      '你熟悉前端编程语言吗？',
      '你有使用前端框架的经验吗？',
      '你了解前端性能优化的方法吗？',
      '你了解跨浏览器兼容性的挑战吗？',
      '你熟悉后端开发技术吗？',
      '你熟悉哪些后端编程语言和框架？',
      '你了解数据库管理系统吗？',
      '你有关于后端安全性的了解吗？',
      '你在团队中如何协作进行全栈开发？'
    ]
  },
  {
    title: '测试',
    content: [
      '你对软件测试的理解程度如何？',
      '你有使用软件测试工具的经验吗？',
      '你了解测试方法论，如黑盒测试和白盒测试吗？',
      '你在测试过程中如何编写测试用例？',
      '你了解自动化测试的概念和工具吗？',
      '你知道如何进行性能测试吗？',
      '你在团队中如何协作进行软件测试？',
      '你了解软件测试的最佳实践吗？',
      '你有关于软件质量保证的了解吗？',
      '你了解软件测试在软件开发生命周期中的重要性吗？'
    ]
  },
  {
    title: '运维',
    content: [
      '你对操作系统有多少了解？',
      '你熟悉哪些操作系统，如Linux、Windows等？',
      '你有使用命令行工具管理系统的经验吗？',
      '你了解网络配置和管理吗？',
      '你有配置和维护服务器的经验吗？',
      '你熟悉容器化技术，如Docker等吗？',
      '你了解自动化部署和配置管理工具吗，比如Ansible、Chef等？',
      '你知道如何进行系统监控和故障排除吗？',
      '你有关于系统安全性的了解吗？',
      '你在团队中如何协作进行运维工作？'
    ]
  },
  {
    title: '产品',
    content: [
      '你对产品经理的角色和责任有多少了解？',
      '你有参与过产品规划和定义的经验吗？',
      '你了解产品设计原则和方法吗？',
      '你在产品开发过程中如何与设计师和工程师合作？',
      '你有使用原型工具进行产品设计的经验吗？',
      '你知道如何进行用户研究和用户体验设计吗？',
      '你了解产品分析和数据驱动的方法吗？',
      '你有制定产品路线图和优先级的经验吗？',
      '你了解产品上线和迭代的流程吗？',
      '你在团队中如何协作推动产品的发展？'
    ]
  },
  {
    title: 'ui',
    content: [
      '你对用户界面（UI）设计的理解程度如何？',
      '你有参与过用户界面设计项目吗？',
      '你熟悉哪些UI设计工具，如Sketch、Figma等？',
      '你了解用户体验（UX）设计原则吗？',
      '你在设计过程中如何考虑用户的需求和反馈？',
      '你有使用动画和交互设计增强用户体验的经验吗？',
      '你知道如何进行UI原型制作吗？',
      '你了解不同平台（Web、Mobile等）上的UI设计差异吗？',
      '你有关于可访问性和可用性的UI设计经验吗？',
      '你在团队中如何协作进行UI设计工作？'
    ]
  },
  {
    title: '运营',
    content: [
      '你对互联网运营的理解程度如何？',
      '你有参与过线上产品运营的经验吗？',
      '你了解用户增长和用户留存的方法吗？',
      '你有使用数据分析工具进行运营分析的经验吗？',
      '你了解社交媒体运营和内容营销吗？',
      '你有策划和执行线上活动的经验吗？',
      '你了解SEO和SEM的基本原理吗？',
      '你有协调并维护线上社区的经验吗？',
      '你知道如何进行用户反馈收集和处理吗？',
      '你在团队中如何协作推动运营工作？'
    ]
  },
  {
    title: '销售',
    content: [
      '你对销售领域的理解程度如何？',
      '你有参与过产品或服务销售的经验吗？',
      '你了解销售技巧和沟通能力的重要性吗？',
      '你有制定销售计划和目标达成的经验吗？',
      '你在客户关系管理方面有哪些经验？',
      '你了解市场分析和竞争情报的重要性吗？',
      '你有使用销售工具和CRM系统的经验吗？',
      '你了解销售报告和数据分析的基本原理吗？',
      '你知道如何处理客户异议和投诉吗？',
      '你在团队中如何协作推动销售业绩？'
    ]
  },
  {
    title: 'java',
    content: [
      '你对Java编程语言的掌握程度如何？',
      '你有参与过使用Java开发的项目经验吗？',
      '你熟悉Java的面向对象编程思想吗？',
      '你了解Java的异常处理机制吗？',
      '你有使用Java构建和维护数据库应用的经验吗？',
      '你熟悉Java的多线程编程吗？',
      '你了解Java的网络编程和Socket通信吗？',
      '你有使用Java框架（如Spring、Hibernate等）的经验吗？',
      '你了解Java的安全编程和防范常见攻击的方法吗？',
      '你在团队中如何协作进行Java开发工作？'
    ]
  },
  {
    title: 'python',
    content: [
      '你对Python编程语言的掌握程度如何？',
      '你有参与过使用Python开发的项目经验吗？',
      '你熟悉Python的基本语法和数据结构吗？',
      '你了解Python的函数式编程和面向对象编程思想吗？',
      '你有使用Python进行数据分析和处理的经验吗？',
      '你熟悉Python的常用库和框架（如NumPy、Pandas、Django等）吗？',
      '你了解Python在机器学习和人工智能领域的应用吗？',
      '你有使用Python进行网络编程和Web开发的经验吗？',
      '你了解Python的调试和性能优化技巧吗？',
      '你在团队中如何协作进行Python开发工作？'
    ]
  },
  {
    title: '机器学习',
    content: [
      '你对机器学习的基本概念和原理有何了解？',
      '你有参与过使用机器学习算法解决问题的项目经验吗？',
      '你熟悉常用的机器学习算法（如线性回归、决策树、支持向量机等）吗？',
      '你了解监督学习、无监督学习和半监督学习的区别吗？',
      '你有使用机器学习工具和库（如Scikit-learn、TensorFlow、PyTorch等）的经验吗？',
      '你了解如何评估和优化机器学习模型的性能吗？',
      '你熟悉深度学习算法和神经网络吗？',
      '你了解机器学习在自然语言处理、计算机视觉等领域的应用吗？',
      '你有使用机器学习解决实际业务问题的经验吗？',
      '你在团队中如何协作进行机器学习项目的开发和部署？'
    ]
  },
  {
    title: '深度学习',
    content: [
      '你对深度学习的基本概念和原理有何了解？',
      '你有参与过使用深度学习算法解决问题的项目经验吗？',
      '你熟悉常用的深度学习框架（如TensorFlow、PyTorch、Keras等）吗？',
      '你了解深度学习中常用的神经网络结构（如卷积神经网络、循环神经网络、注意力机制等）吗？',
      '你有使用深度学习解决自然语言处理、计算机视觉等问题的经验吗？',
      '你了解如何评估和优化深度学习模型的性能吗？',
      '你有进行深度学习模型部署和优化的经验吗？',
      '你了解深度学习在推荐系统、语音识别等领域的应用吗？',
      '你有使用深度学习框架进行图像生成、强化学习等任务的经验吗？',
      '你在团队中如何协作进行深度学习项目的开发和部署？'
    ]
  }
]
</script>
