<template>
  <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
      <div class="lg:col-span-3">
        <p class="mt-3 text-lg">
          职业和专业密切相关，专业产生于职业需求、因职业需求而确立，每个专业都有自身对应的职业方向，从这个意义上来说，选专业就是选职业，确定自身的专业方向更是一个人职业生涯的开端。
          你是哪一种类型呢？匹配的职业又有哪些？根据职业兴趣，把自己放到合适的位置上，会起到事半功倍的效果哦！
        </p>
        <div class="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <NTooltip>
            <template #trigger>
              <NButton type="primary" @click="emit('start-assess')">
                {{ hasAssessedBefore ? '再测一次' : '开始测试' }}
              </NButton>
            </template>
            <template #default>
              测评可多次使用，每次使用间隔为6个月。参与测评后，你的测评状态（是否已做测评）将会显示在该测评管理系统中，非授权状态下，不展示你的测评报告信息，请你放心使用！
            </template>
          </NTooltip>
          <NButton type="info" v-if="hasAssessedBefore" @click="emit('go-to-result')">
            查看上次测试结果
          </NButton>
        </div>
      </div>
      <div class="lg:col-span-4 mt-10 lg:mt-0">
        <img class="w-full rounded-xl shadow-xl" src="/img/business.avif" alt="Image Description" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NTooltip } from 'naive-ui'

withDefaults(
  defineProps<{
    hasAssessedBefore: boolean
  }>(),
  { hasAssessedBefore: false }
)
const emit = defineEmits<{
  'go-to-result': []
  'start-assess': []
}>()
</script>
