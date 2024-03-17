<template>
  <NConfigProvider :theme-overrides="theme">
    <NDialogProvider>
      <NMessageProvider>
        <NLoadingBarProvider>
          <TopEntry class="w-screen h-screen" />
        </NLoadingBarProvider>
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NLoadingBarProvider } from 'naive-ui'
import theme from 'assets/nord.theme.json'
import TopEntry from 'components/top-entry.vue'
import { registerTheme } from 'echarts/core'
import echartTheme from 'assets/nord.echarts.json'
import { provide } from 'vue'
import { THEME_KEY } from 'vue-echarts'
import { NDialogProvider } from 'naive-ui'
registerTheme('nord', echartTheme)
provide(THEME_KEY, 'nord')
</script>
