<template>
  <NLayout class="w-full h-full flex" has-sider>
    <NLayoutSider
      v-if="!isMobile().value"
      id="menu"
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="isCollapsed"
      @collapse="() => (isCollapsed = true)"
      @expand="() => (isCollapsed = false)"
    >
      <SideMenu :collapsed="isCollapsed" @toggle="(toggle) => (isCollapsed = toggle)" />
    </NLayoutSider>
    <NLayout class="grow" content-style="display: flex; flex-direction: column;">
      <NLayoutHeader v-if="isMobile().value" class="flex shadow-2xl p-2">
        <NPopover trigger="click">
          <template #trigger>
            <NIcon size="20px">
              <Menu2 />
            </NIcon>
          </template>
          <template #default>
            <SideMenu :collapsed="false" />
          </template>
        </NPopover>
      </NLayoutHeader>
      <NLayoutContent
        class="grow flex flex-col"
        content-style="display: flex; flex-direction: column; flex-grow: 1;"
      >
        <MainContent />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NLayout,
  NLayoutContent,
  NLayoutSider,
  useMessage,
  useLoadingBar,
  NLayoutHeader,
  NIcon,
  NPopover
} from 'naive-ui/lib'
import { onMounted } from 'vue'
import SideMenu from './side-menu'
import MainContent from './main-content.vue'
import { useRouter } from 'vue-router'
import { isMobile } from '../util/reponsive'
import { Menu2 } from '@vicons/tabler'

const isCollapsed = ref(true)

onMounted(async () => {
  window.$loading = useLoadingBar()
  window.$message = useMessage()
  window.$router = useRouter()
})
</script>

<style lang="scss" scoped>
#menu {
  box-shadow: 2px 0px 10px 0px rgba($color: #000000, $alpha: 0.05);
}
</style>
