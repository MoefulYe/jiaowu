<template>
  <div class="flex items-center gap-2">
    <NTooltip v-for="i of 5" :key="i" trigger="hover" placement="bottom">
      <template #trigger>
        <span
          :class="[
            i === model ? `text-yellow-400 ${emojiFill(i)}` : emoji(i),
            'hover:-translate-y-2 hover:scale-125 transition-transform delay-150 ease-in-out cursor-pointer',
            emojiClass
          ]"
          @click="
            () => {
              if (model !== i) {
                model = i as Score
              } else {
                model = undefined
              }
            }
          "
        />
      </template>
      <template #default>
        <span>{{ tip(i) }}</span>
      </template>
    </NTooltip>
  </div>
</template>

<script setup lang="ts">
import { NTooltip } from 'naive-ui'

const model = defineModel<Score>()
const props = withDefaults(
  defineProps<{
    emojiClass?: string
    tips?: string[]
  }>(),
  {
    emojiClass: 'text-2xl',
    tips: () => ['讨厌', '不喜欢', '一般', '喜欢', '非常喜欢']
  }
)

const tip = (option: number) => props.tips[option - 1]
</script>

<script lang="ts">
const emojis: string[] = [
  'icon-[bi--emoji-frown]',
  'icon-[bi--emoji-astonished]',
  'icon-[bi--emoji-expressionless]',
  'icon-[bi--emoji-smile]',
  'icon-[bi--emoji-laughing]'
]
const emojisFill: string[] = [
  'icon-[bi--emoji-frown-fill]',
  'icon-[bi--emoji-astonished-fill]',
  'icon-[bi--emoji-expressionless-fill]',
  'icon-[bi--emoji-smile-fill]',
  'icon-[bi--emoji-laughing-fill]'
]
const emoji = (option: number) => emojis[option - 1]
export const emojiFill = (option: number) => emojisFill[option - 1]
export type Score = 1 | 2 | 3 | 4 | 5 | undefined
</script>
