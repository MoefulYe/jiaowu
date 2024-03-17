<template>
  <div class="max-w-[40rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
    <div>
      总计20个方向，每个方向各5个题目，总计100个题目，每个题目共有五个选项，分别是：非常不符合、不符合、一般、符合、非常符合。请根据自己的实际情况选择，不要过于追求完美，否则会影响测评结果的准确性。预计测评时间为30分钟，测评完成后，你将会得到一份详细的测评报告，报告中包含了你的职业兴趣类型、职业兴趣类型的详细解释、适合你的职业类型、适合你的职业类型的详细解释、适合你的专业类型、适合你的专业类型的详细解释等内容。
    </div>
    <NButton @click="emit('next')">{{ countdown }}秒后开始测试。不想等待？点此开始</NButton>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { onMounted, onUnmounted, ref } from 'vue'
const countdown = ref(30)
const emit = defineEmits(['next'])
let handler = undefined
onMounted(() => {
  handler = setInterval(() => {
    if (countdown.value == 0) {
      emit('next')
    }
    countdown.value--
  }, 1000)
})
onUnmounted(() => clearInterval(handler!))
</script>
