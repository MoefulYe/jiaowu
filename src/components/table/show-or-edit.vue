<script setup lang="ts" generic="T">
import { UnwrapRef, nextTick, ref, toRef } from 'vue'

// eslint-disable-next-line vue/no-setup-props-destructure
const { data } = defineProps<{
  data: T
}>()
const emit = defineEmits<{
  update: [data: UnwrapRef<T>]
}>()
const isEdit = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const inputVal = ref(data)

const handleClick = () => {
  isEdit.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const handleChange = () => {
  emit('update', inputVal.value)
  isEdit.value = false
}
</script>

<template></template>
