<template>
  <NLayout>
    <NLayoutHeader bordered class="font-serif">
      <div class="p-2 flex items-center gap-2">
        <span class="text-sm cursor-pointer">{{ EMPLOYER_TITLE }}</span>
        <span class="grow" />
        <NDropdown
          :options="dropdownOpts"
          @select="
            async (key) => {
              switch (key) {
                case 'exit':
                  if (await confirm('注销', '确定退出登录？')) {
                    useStateStore().logout()
                    gotoEmployeeLogin()
                  }
                  break
              }
            }
          "
        >
          <NAvatar circle size="small">
            {{ username.charAt(0) }}
          </NAvatar>
        </NDropdown>
        <showOrEdit v-model:value="username" />
      </div>
    </NLayoutHeader>
    <NLayoutContent></NLayoutContent>
  </NLayout>
</template>

<script lang="tsx" setup>
import confirm from '@/components/confirm'
import showOrEdit from '@/components/show-or-edit.vue'
import { EMPLOYER_TITLE } from '@/constants'
import { gotoEmployeeLogin } from '@/router'
import { useStateStore } from '@/stores/user-state'
import { renderIcon } from '@/util/render'
import { NAvatar, NDropdown, NLayout, NLayoutContent, NLayoutHeader } from 'naive-ui'
import { type DropdownOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
const { _username: username } = storeToRefs(useStateStore())
</script>

<script lang="tsx">
const dropdownOpts: DropdownOption[] = [
  {
    label: '退出',
    key: 'exit',
    icon: renderIcon(<span class="icon-[carbon--logout]" />)
  }
]
</script>
