<template>
  <div
    @click="
      () => {
        isEdit = true
        value2 = value
        nextTick(() => inputRef?.focus())
      }
    "
  >
    <NInput
      ref="inputRef"
      v-if="isEdit"
      v-model:value="value2"
      :clearable="props.clearable"
      @keyup.enter="() => inputRef?.blur()"
      @blur="done"
      :placeholder="props.placeholder"
    />
    <span v-else>{{ value === undefined || value.length === 0 ? 'null' : value }}</span>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, shallowRef } from 'vue'
import { NInput } from 'naive-ui'
import type { InputInst } from 'naive-ui'

const emit = defineEmits<{
  'update:value': [val?: string]
}>()

const props = withDefaults(defineProps<Props>(), { clearable: false, placeholder: undefined })
const value2 = ref<string>()

const inputRef = shallowRef<InputInst>()
const isEdit = ref(false)

const done = async () => {
  isEdit.value = false
  emit('update:value', value2.value)
}
</script>

<script lang="ts">
interface Props {
  clearable?: boolean
  placeholder?: string
  value?: string
}
</script>
