<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <NLayout class="w-full h-full flex" has-sider>
    <NLayoutSider
      v-if="!isMobile"
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
      <NLayoutHeader class="flex p-2 sm:p-4 sm:h-12 items-center" bordered>
        <NPopover v-if="isMobile" trigger="click" class="mr-4">
          <template #trigger>
            <span class="icon-[mingcute--menu-line]" />
          </template>
          <template #default>
            <SideMenu :collapsed="false" />
          </template>
        </NPopover>
        <span class="ml-2 sm:ml-0">{{ TITLE }}</span>
        <span class="flex-grow" />
        <NDropdown :options="avatarDropdownOpts" trigger="click" @select="selectDropdown">
          <NAvatar size="small" class="mr-2" round>
            {{ username.slice(0, 1) }}
          </NAvatar>
        </NDropdown>
        <span class="flex items-center"> 你好, <ShowOrEdit v-model:value="username" /> </span>
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
import { defineAsyncComponent, ref } from 'vue'
import {
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NLayoutHeader,
  NPopover,
  NAvatar,
  NDropdown,
  type DropdownOption
} from 'naive-ui/lib'
import { isMobile } from '../../util/reponsive'
import { renderIcon } from '../../util/render'
import { TITLE } from '../../constants'
import { storeToRefs } from 'pinia'
import { useStateStore } from '../../stores/user-state'
import { gotoLogin, gotoProfile } from '../../router'
import ShowOrEdit from '../../components/show-or-edit.vue'
import confirm from '../../components/confirm'

const SideMenu = defineAsyncComponent(() => import('../../components/side-menu.vue'))
const { username } = storeToRefs(useStateStore())
const isCollapsed = ref(true)

const selectDropdown = async (key: string) => {
  switch (key) {
    case 'profile':
      gotoProfile()
      break
    case 'logout':
      if (await confirm('注销', '确定要注销吗?')) {
        useStateStore().logout()
        gotoLogin()
      }
      break
  }
}
</script>

<script lang="tsx">
const avatarDropdownOpts: DropdownOption[] = [
  {
    label: '个人信息',
    key: 'profile',
    icon: renderIcon(<span class="icon-[iconamoon--profile]" />)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(<span class="icon-[material-symbols--exit-to-app-rounded]" />)
  }
]
</script>

<style lang="scss" scoped>
#menu {
  box-shadow: 2px 0px 5px 0px rgba($color: #000000, $alpha: 0.1);
}
</style>
