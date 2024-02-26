<template>
  <div>
    <NTooltip v-for="i in [0, 1, 2, 3, 4]" :key="i" trigger="hover" placement="bottom">
      <template #trigger>
        <span
          :class="[
            i === model ? `text-[#FFCC4D] ${emojiFill(i)}` : emoji(i),
            'hover:-translate-y-2 hover:scale-125 transition-transform delay-150 ease-in-out cursor-pointer',
            emojiClass
          ]"
          @click="
            () => {
              if (model !== i) {
                model = i
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

const model = defineModel<EmojiOption>()
withDefaults(
  defineProps<{
    emojiClass?: string
  }>(),
  {
    emojiClass: 'text-2xl m-2'
  }
)
</script>

<script lang="ts">
export enum EmojiOption {
  Hate,
  Unlike,
  Normal,
  Like,
  Love
}
const tips = ['讨厌', '不喜欢', '一般', '喜欢', '非常喜欢']
const tip = (option: EmojiOption) => tips[option]
const emojis = [
  'icon-[bi--emoji-frown]',
  'icon-[bi--emoji-astonished]',
  'icon-[bi--emoji-expressionless]',
  'icon-[bi--emoji-smile]',
  'icon-[bi--emoji-laughing]'
]
const emojisFill = [
  'icon-[bi--emoji-frown-fill]',
  'icon-[bi--emoji-astonished-fill]',
  'icon-[bi--emoji-expressionless-fill]',
  'icon-[bi--emoji-smile-fill]',
  'icon-[bi--emoji-laughing-fill]'
]
const emoji = (option: EmojiOption) => emojis[option]
const emojiFill = (option: EmojiOption) => emojisFill[option]
</script>
