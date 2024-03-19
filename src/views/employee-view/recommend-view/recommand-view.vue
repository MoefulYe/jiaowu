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
            <span class="flex items-center gap-1">
              <span class="flex items-center gap-1">
                <span
                  v-if="kind === Kind.兴趣推荐"
                  class="icon-[streamline--interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars]"
                />
                <span class="icon-[uil--briefcase-alt]" />
                {{ kind }}
              </span>
            </span>
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

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NCard } from 'naive-ui'
import ResumeView from './resume-view.vue'
import InterestView from './interest-view.vue'
withDefaults(defineProps<{ kind: Kind }>(), { kind: Kind.简历推荐 })
</script>

<script lang="ts">
export const enum Kind {
  简历推荐 = '简历推荐',
  兴趣推荐 = '兴趣推荐'
}
</script>
