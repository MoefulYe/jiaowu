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
      <NLayoutHeader class="flex p-2 sm:p-4 sm:h-12 sm:bg-white" id="header">
        <NPopover v-if="isMobile().value" trigger="click" class="mr-4">
          <template #trigger>
            <NIcon size="20px">
              <Menu2 />
            </NIcon>
          </template>
          <template #default>
            <SideMenu :collapsed="false" />
          </template>
        </NPopover>
        <span class="ml-2 sm:ml-0">{{ TITLE }}</span>
        <span class="flex-grow" />
        <NDropdown :options="avatarDropdownOpts" trigger="click">
          <NAvatar
            size="small"
            class="mr-2"
            src="https://avatars.githubusercontent.com/u/32326912?v=4"
            round
          />
        </NDropdown>
        <span>{{ username }}</span>
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
import { h, ref } from 'vue'
import {
  NLayout,
  NLayoutContent,
  NLayoutSider,
  useMessage,
  useLoadingBar,
  NLayoutHeader,
  NIcon,
  NPopover,
  NAvatar,
  NDropdown,
  DropdownOption
} from 'naive-ui/lib'
import { onMounted } from 'vue'
import SideMenu from './side-menu'
import MainContent from './main-content.vue'
import { useRouter } from 'vue-router'
import { isMobile } from '../util/reponsive'
import { Menu2 } from '@vicons/tabler'
import { useTokenStore } from '../stores/token'
import { Exit, Settings, UserProfile } from '@vicons/carbon'

const isCollapsed = ref(true)
const TITLE = import.meta.env.VITE_TITLE
const username = useTokenStore().username

onMounted(async () => {
  window.$loading = useLoadingBar()
  window.$message = useMessage()
  window.$router = useRouter()
})
</script>

<script lang="ts">
const renderIcon = (icon: any) => () => h(NIcon, null, { default: () => h(icon) })

const avatarDropdownOpts: DropdownOption[] = [
  { label: '个人信息', key: 'profile', icon: renderIcon(UserProfile) },
  { label: '设置', key: 'setting', icon: renderIcon(Settings) },
  { label: '退出登录', key: 'logout', icon: renderIcon(Exit) }
]
</script>

<style lang="scss" scoped>
#menu {
  box-shadow: 2px 0px 10px 0px rgba($color: #000000, $alpha: 0.05);
}

#header {
  box-shadow: 0px 2px 10px 0px rgba($color: #000000, $alpha: 0.05);
}
</style>
