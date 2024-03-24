<template>
  <NLayout>
    <NLayoutHeader bordered>
      <div class="p-2 flex items-center gap-2">
        <span class="text-sm cursor-pointer font-serif">{{ EMPLOYER_TITLE }}</span>
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
              class="w-32"
              placeholder="输入方向"
              size="small"
              clearable
            />
            <NDynamicTags v-model:value="skills" type="primary">
              <template #trigger="{ activate, disabled }">
                <NTooltip>
                  <template #trigger>
                    <NButton size="small" :disabled="disabled" @click="activate">
                      <template #icon>
                        <span class="icon-[carbon--filter]" />
                      </template>
                    </NButton>
                  </template>
                  <template #default> 添加要筛选的技能项 </template>
                </NTooltip>
              </template>
            </NDynamicTags>
            <NTooltip>
              <template #trigger>
                <NButton type="info" size="small" @click="fetch">
                  <span class="icon-[mingcute--search-line]" />
                </NButton>
              </template>
              <template #default> 查询 </template>
            </NTooltip>
            <NTooltip>
              <template #trigger>
                <NButton type="primary" size="small" @click="downloadXlsx">
                  <template #icon>
                    <span class="icon-[line-md--loading-loop]" v-if="downloading" />
                    <span class="icon-[material-symbols--download]" v-else />
                  </template>
                </NButton>
              </template>
              <template #default> 下载查询结果为xlsx </template>
            </NTooltip>
          </div>
          <NDataTable :loading="loading" :pagination="pagination" :columns="cols" :data="profiles">
            <template #empty>
              <div class="flex flex-col items-center gap-2 text-[#4c566a] opacity-80">
                <div class="icon-[solar--confounded-square-outline] text-6xl" />
                <div class="text-xl">找不到符合条件的求职者</div>
              </div>
            </template>
            <template #loading>
              <span class="icon-[line-md--loading-loop] text-4xl"></span>
            </template>
          </NDataTable>
        </div>
      </NCard>
    </NLayoutContent>
    <NDrawer
      placement="right"
      v-model:show="drawerShow"
      @mask-click="drawerShow = false"
      :width="532"
    >
      <DetailProfile ref="drawerContentRef" />
    </NDrawer>
  </NLayout>
</template>

<script lang="tsx" setup>
import { fetchQualifiedApplicants } from '@/api/employee'
import { JOB_OPTS, type Job } from '@/api/jobs'
import { type BriefProfile } from '@/api/user/profile'
import confirm from '@/components/confirm'
import showOrEdit from '@/components/show-or-edit.vue'
import { EMPLOYER_TITLE } from '@/constants'
import { useStateStore } from '@/stores/user-state'
import { renderIcon } from '@/util/render'
import {
  type DataTableColumns,
  NAvatar,
  NButton,
  NCard,
  NDataTable,
  NDrawer,
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
import { type Ref, type ShallowRef, nextTick, reactive, ref, shallowRef } from 'vue'
import DetailProfile from './detail-profile.vue'
import { utils, write } from 'xlsx'
import download from '@/util/download'

const { _username: username } = storeToRefs(useStateStore())

const job = ref<Job>()
const skills = ref<string[]>([])
const loading = ref(false)
const profiles = shallowRef<BriefProfile[]>([])
const pagination = reactive({
  page: 1,
  pageSize: 25,
  pageSizes: [25, 50],
  itemCount: 0,
  showSizePicker: true,
  onUpdatePage(page: number) {
    pagination.page = page
    fetch()
  },
  onUpdatePageSize(pageSize: number) {
    pagination.pageSize = pageSize
    pagination.page = 1
    fetch()
  },
  init() {
    pagination.page = 1
  }
})
const drawerShow = ref(false)
const drawerContentRef = shallowRef<DrawerContentInst>()
const downloading = ref(false)

const fetch = async () => {
  if (job.value === undefined && skills.value.length === 0) {
    window.$message.error('请至少选择一个筛选条件')
    window.$loading.error()
    return
  }
  loading.value = true
  const { total, data } = await fetchQualifiedApplicants({
    page: pagination.page,
    size: pagination.pageSize,
    direction: job.value,
    skills: skills.value
  })
  profiles.value = data
  pagination.itemCount = total
  loading.value = false
}

const cols = columns(drawerShow, drawerContentRef)
const downloadXlsx = async () => {
  if (downloading.value) {
    window.$message.error('正在下载中，请稍后')
    return
  }
  if (job.value === undefined && skills.value.length === 0) {
    window.$message.error('请至少选择一个筛选条件')
    window.$loading.error()
    return
  } else {
    downloading.value = true
    const { data } = await fetchQualifiedApplicants({
      page: 1,
      size: 1024,
      direction: job.value,
      skills: skills.value
    })
    const sheet1 = utils.json_to_sheet(data)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, sheet1)
    const wbout = write(wb, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'array'
    })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    download('符合条件的求职者信息.xlsx', blob)
    downloading.value = false
  }
}
</script>

<script lang="tsx">
export type DrawerContentInst = InstanceType<typeof DetailProfile>
const dropdownOpts: DropdownOption[] = [
  {
    label: '退出',
    key: 'exit',
    icon: renderIcon(<span class="icon-[carbon--logout]" />)
  }
]

const columns = (
  show: Ref<Boolean>,
  drawerContent: ShallowRef<DrawerContentInst | undefined>
): DataTableColumns<BriefProfile> => [
  {
    title: '姓名',
    key: 'name',
    render: ({ name }) => name ?? '未知'
  },
  {
    title: '性别',
    key: 'gender',
    render: ({ gender }) => gender ?? '未知'
  },
  {
    title: '年龄',
    key: 'age',
    render: ({ birthday }) =>
      birthday ? `${new Date().getFullYear() - new Date(birthday).getFullYear()}岁` : '未知'
  },
  {
    title: '就读学校',
    key: 'school',
    render: ({ school }) => school ?? '未知'
  },
  {
    title: '专业',
    key: 'major',
    render: ({ college }) => college ?? '未知'
  },
  {
    title: '学历',
    key: 'degree',
    render: ({ studentType }) => studentType ?? '未知'
  },
  {
    key: 'detail',
    render: ({ userId }) => (
      <NTooltip>
        {{
          trigger: () => (
            <span
              class="icon-[uiw--more] hover:text-[#88c0d0]"
              onClick={() => {
                show.value = true
                nextTick(() => {
                  drawerContent.value?.fetch(userId)
                })
              }}
            />
          ),
          default: () => '查看详情'
        }}
      </NTooltip>
    )
  }
]
</script>
