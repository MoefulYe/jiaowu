<template>
  <div class="sm:p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style="display: flex; flex-direction: column; gap: 2rem;"
    >
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[carbon--cube]" /> 职业评估
          </span></NBreadcrumbItem
        >
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[ph--exam]" /> 职业测评
          </span></NBreadcrumbItem
        >
      </NBreadcrumb>
      <div class="grow flex items-center justify-center">
        <AssessmentBegin
          :has-assessed-before="false"
          @go-to-result="
            () => {
              status = Status.说明页
              progress = 100
            }
          "
          @start-assess="status = Status.说明页"
          v-if="status === Status.未开始"
        />
        <AssessmentStatement @next="status = Status.测评中" v-else-if="status === Status.说明页" />
        <AssessmentContent
          v-model:progress="progress"
          @done="
            (data) => {
              scores = data
              status = Status.结果页
            }
          "
          v-else-if="status === Status.测评中"
        />
        <AssessmentResult v-else-if="status === Status.结果页" :scores="scores" />
      </div>
    </NCard>
    <NProgress
      class="fixed bottom-0"
      type="line"
      :height="4"
      :percentage="progress"
      :border-radius="0"
      :show-indicator="false"
    />
  </div>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NCard, NProgress } from 'naive-ui'
import { ref } from 'vue'
import AssessmentBegin from './assessment-begin.vue'
import AssessmentStatement from './assessment-statement.vue'
import AssessmentContent from './assessment-content.vue'
import AssessmentResult from './assessment-result.vue'
const progress = ref(9)
const status = ref(Status.未开始)
const scores = ref<number[]>()
</script>

<script lang="ts">
enum Status {
  '未开始',
  '说明页',
  '测评中',
  '结果页'
}
</script>
