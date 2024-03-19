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
        你好👋,
        <showOrEdit v-model:value="username" />
      </div>
    </NLayoutHeader>
    <NLayoutContent class="p-4 h-full">
      <NCard class="round h-full">
        <template #header> 查询符合条件的求职者 </template>
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <NSelect
              v-model:value="job"
              :options="JOB_OPTS"
              class="w-36"
              placeholder="输入查询的方向"
              clearable
            />
            <NDynamicTags v-model:value="skills" type="primary">
              <template #trigger="{ activate, disabled }">
                <NButton size="small" type="primary" :disabled="disabled" @click="activate">
                  <template #icon>
                    <span class="icon-[carbon--add]" />
                  </template>
                  <template #default> 添加要筛选的技能项 </template>
                </NButton>
              </template>
            </NDynamicTags>
            <NTooltip>
              <template #trigger>
                <NButton type="info" size="small">
                  <span class="icon-[carbon--search]" />
                </NButton>
              </template>
              <template #default> 查询 </template>
            </NTooltip>
          </div>
          <NDataTable loading>
            <template #empty>
              <div class="flex flex-col items-center gap-2">
                <div class="icon-[solar--confounded-square-outline] text-6xl" />
                <div class="text-2xl">找不到符合条件的求职者</div>
              </div>
            </template>
            <template #loading>
              <span class="icon-[line-md--loading-twotone-loop] text-6xl" />
            </template>
          </NDataTable>
        </div>
      </NCard>
    </NLayoutContent>
  </NLayout>
</template>

<script lang="tsx" setup>
import { JOB_OPTS, Job } from '@/api/jobs'
import confirm from '@/components/confirm'
import showOrEdit from '@/components/show-or-edit.vue'
import { EMPLOYER_TITLE } from '@/constants'
import { useStateStore } from '@/stores/user-state'
import { renderIcon } from '@/util/render'
import {
  NAvatar,
  NButton,
  NCard,
  NDataTable,
  NDropdown,
  NDynamicTags,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NSelect,
  NTooltip
} from 'naive-ui'
import { type DropdownOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const { _username: username } = storeToRefs(useStateStore())

const job = ref<Job>()
const skills = ref<string[]>([])
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
