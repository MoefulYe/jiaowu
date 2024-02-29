<template>
  <NCard
    class="w-fit h-fit rounded-md shadow-lg"
    content-style="width: fit-content; height: fit-content; padding: 0rem;"
  >
    <div class="flex items-start">
      <img src="/img/business.avif" class="w-[488px] round-md" />
      <div class="p-4 w-96 flex flex-col">
        <p>
          职业和专业密切相关，专业产生于职业需求、因职业需求而确立，每个专业都有自身对应的职业方向，从这个意义上来说，选专业就是选职业，确定自身的专业方向更是一个人职业生涯的开端。
          你是哪一种类型呢？
        </p>
        <p>匹配的职业又有哪些？根据职业兴趣，把自己放到合适的位置上，会起到事半功倍的效果哦！</p>
        <p class="text-orange-600">测评可多次使用，每次使用间隔为6个月</p>
        <div class="flex items-center gap-2">
          <NTooltip>
            <template #trigger>
              <span class="icon-[material-symbols--info] text-base text-gray-500"></span>
            </template>
            <template #default>
              参与测评后，非授权状态下，不展示你的测评报告信息，请你放心使用！
            </template>
          </NTooltip>
          <span class="grow" />
          <NButton type="primary" @click="$emit('start-assess')">
            {{ hasAssessedBefore ? '再测一次' : '开始测试' }}</NButton
          >
          <NButton v-if="hasAssessedBefore" @click="$emit('go-to-result')">查看上次结果</NButton>
        </div>
      </div>
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { NButton, NCard, NTooltip } from 'naive-ui'

const props = defineProps<{
  hasAssessedBefore: boolean
}>()
const emit = defineEmits<{
  'go-to-result': []
  'start-assess': []
}>()
</script>
