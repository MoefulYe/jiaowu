<template>
  <div class="p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style="display: flex; flex-direction: column; gap: 4rem;"
    >
      <template #header>
        <NBreadcrumb>
          <NBreadcrumbItem :clickable="false">
            <span class="flex items-center gap-1">
              <span class="icon-[carbon--cube]" /> 职业评估
            </span></NBreadcrumbItem
          >
          <NBreadcrumbItem :clickable="false">
            <span class="flex items-center gap-1">
              <span class="icon-[teenyicons--bulb-on-outline]" /> 职业推荐
            </span></NBreadcrumbItem
          >
          <NBreadcrumbItem :clickable="false">
            <CrumbItem :kind="kind" />
          </NBreadcrumbItem>
        </NBreadcrumb>
      </template>
      <template #default>
        <ResumeView v-if="kind === Kind.简历推荐" />
        <InterestView v-else />
      </template>
    </NCard>
  </div>
</template>

<script setup lang="tsx">
import { defineComponent, ref } from 'vue'
import { type DropdownOption, NBreadcrumb, NBreadcrumbItem, NCard, NDropdown } from 'naive-ui'
import ResumeView from './resume-view.vue'
import InterestView from './interest-view.vue'

const kind = ref(Kind.简历推荐)
const CrumbItem = defineComponent({
  setup: () => () => (
    <NDropdown options={dropdownOpts}>
      <span class="flex items-center gap-1">
        {kind.value === Kind.兴趣推荐 ? (
          <span class="icon-[streamline--interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars]" />
        ) : (
          <span class="icon-[uil--briefcase-alt]" />
        )}
        {kind.value}
      </span>
    </NDropdown>
  )
})

const dropdownOpts: DropdownOption[] = [
  {
    label: () => (
      <span class="flex items-center gap-1" onClick={() => (kind.value = Kind.简历推荐)}>
        <span class="icon-[uil--briefcase-alt]" />
        简历推荐
      </span>
    )
  },
  {
    label: () => (
      <span class="flex items-center gap-1" onClick={() => (kind.value = Kind.兴趣推荐)}>
        <span class="icon-[streamline--interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars]" />
        兴趣推荐
      </span>
    )
  }
]
</script>

<script lang="tsx">
enum Kind {
  简历推荐 = '简历推荐',
  兴趣推荐 = '兴趣推荐'
}
</script>
