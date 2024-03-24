<template>
  <div>
    <div
      class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8"
      v-if="step < JOBS.length"
    >
      <h2 class="text-2xl mb-8">{{ JOBS[step] }}</h2>
      <div class="flex flex-col gap-4 items-center">
        <div
          v-for="(content, idx) in QUESTIONS[JOBS[step]]"
          :key="idx"
          :id="`${idx}`"
          class="flex flex-col items-center gap-2"
        >
          <div>
            {{ `${step * QUESTIONS_PER_JOB + idx + 1}. ${content}` }}
          </div>
          <EmojiRadio v-model="answers[step * QUESTIONS_PER_JOB + idx]" :tips="tips" />
        </div>
      </div>
      <div class="flex gap-2">
        <NButton @click="prev">上一页</NButton>
        <NButton @click="step++">下一页</NButton>
        <NSelect :options="SELECT_OPTS" v-model:value="step" class="w-24" />
        <NButton @click="step = JOBS.length">检查</NButton>
      </div>
    </div>
    <div
      class="max-w-[85rem] mx-auto sm:px-6 lg:px-8 flex flex-col items-center gap-8"
      v-else-if="step === JOBS.length"
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
              @click="step = Math.floor(idx / QUESTIONS_PER_JOB)"
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
import EmojiRadio, { type Score, emojiFill } from '@/components/emoji-radio.vue'
import { NButton, NSelect, NTooltip } from 'naive-ui'
import confirm from '@/components/confirm'
import { JOBS } from '@/api/jobs'
import questions from '@/assets/questions.json'

const emit = defineEmits<{
  done: [scores: number[]]
}>()
const progress = defineModel<number>('progress', { required: true })
const answers = ref<Score[]>(Array.from({ length: TOTAL }).map(() => undefined))
const step = ref<number>(0)
watch(step, () => (progress.value = step.value * 5))

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
  const result = Array.from({ length: JOBS.length }, () => 0)
  for (let i = 0; i < TOTAL; i++) {
    result[Math.floor(i / QUESTIONS_PER_JOB)] += answers[i]!
  }
  return result
}

const prev = () => {
  if (step.value === 0) {
    window.$message.warning('没有上一页')
  } else {
    step.value--
  }
}
const icon = (score?: number) =>
  score !== undefined ? `${emojiFill(score)} text-yellow-400` : 'icon-[bi--emoji-tear]'
const tooltip = (score?: number) => (score !== undefined ? tips[score - 1] : '未填写')
</script>

<script lang="ts">
const QUESTIONS_PER_JOB = 5
const TOTAL = JOBS.length * QUESTIONS_PER_JOB
const tips = ['很不符合', '不符合', '一般', '符合', '很符合']
const SELECT_OPTS = JOBS.map((job: string, idx) => ({
  value: idx,
  label: job
})).concat({
  value: JOBS.length,
  label: '检查'
})
const QUESTIONS: Record<string, string[]> = questions
</script>
