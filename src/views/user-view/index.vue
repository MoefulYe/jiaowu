<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NLayout class="w-full h-full flex" has-sider>
    <NLayoutSider
      v-if="!isMobile().value"
      id="menu"
      collapse-mode="width"
      :collapsed-width="64"
      :width="180"
      :collapsed="isCollapsed"
      @collapse="() => (isCollapsed = true)"
      @expand="() => (isCollapsed = false)"
    >
      <SideMenu @toggle="(toggle) => (isCollapsed = toggle)" />
    </NLayoutSider>
    <NLayout class="grow" content-style="display: flex; flex-direction: column;">
      <NLayoutHeader class="flex p-2 sm:p-4 sm:h-12" id="header">
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
        <NDropdown :options="avatarDropdownOpts" trigger="click" @select="selectDropdown">
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
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import {
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NLayoutHeader,
  NIcon,
  NPopover,
  NAvatar,
  NDropdown,
  type DropdownOption
} from 'naive-ui/lib'
import SideMenu from '../../components/side-menu.vue'
import { isMobile } from '../../util/reponsive'
import { Menu2 } from '@vicons/tabler'
import { Exit, UserProfile } from '@vicons/carbon'
import { renderIcon } from '../../util/render'
import { TITLE } from '../../constants'
import { storeToRefs } from 'pinia'
import { useStateStore } from '../../stores/user-state'
import { gotoLogin, gotoProfile } from '../../router'

const { username } = storeToRefs(useStateStore())
const isCollapsed = ref(true)

const selectDropdown = (key: string) => {
  switch (key) {
    case 'profile':
      gotoProfile()
      break
    case 'logout':
      useStateStore().logout()
      gotoLogin()
      break
  }
}
</script>

<script lang="tsx">
const avatarDropdownOpts: DropdownOption[] = [
  { label: '个人信息', key: 'profile', icon: renderIcon(<UserProfile />) },
  { label: '退出登录', key: 'logout', icon: renderIcon(<Exit />) }
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
