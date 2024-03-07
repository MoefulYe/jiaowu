<template>
  <NCard>
    <template #header>
      <div class="p-2 flex justify-end items-center">
        <NTooltip>
          <template #trigger>
            <NButton type="primary" class="rounded-full" size="small" @click="data.push({})">
              <span class="icon-[material-symbols--add]" />
            </NButton>
          </template>
          <template #default> 添加项目经历 </template>
        </NTooltip>
      </div>
    </template>
    <template #default>
      <div class="flex flex-col gap-4">
        <div v-for="(proj, idx) of data" :key="idx">
          <NCard>
            <template #default>
              <NForm :rules="rules(idx)" v-model="data[idx]" ref="formRefs">
                <NGrid :cols="24" :x-gap="8">
                  <NFormItemGi label="名称" path="name" required :span="12">
                    <NInput v-model:value="proj.name" />
                  </NFormItemGi>
                  <NFormItemGi label="角色" path="role" :span="12">
                    <NInput v-model:value="proj.role" clearable />
                  </NFormItemGi>
                  <NFormItemGi label="开始时间" path="start" required :span="12">
                    <NDatePicker
                      type="month"
                      v-model:formatted-value="proj.start"
                      :is-date-disabled="(ts: number) => ts > Date.now()"
                    />
                  </NFormItemGi>
                  <NFormItemGi label="结束时间" path="end" required :span="12">
                    <NDatePicker
                      type="month"
                      v-model:formatted-value="proj.end"
                      :is-date-disabled="(ts: number) => ts > Date.now()"
                    />
                  </NFormItemGi>
                  <NFormItemGi label="链接" path="link" :span="12">
                    <NInput v-model:value="proj.link" clearable />
                  </NFormItemGi>
                  <NFormItemGi label="描述" path="description" :span="24">
                    <NInput v-model:value="proj.description" type="textarea" clearable />
                  </NFormItemGi>
                </NGrid>
              </NForm>
            </template>
            <template #footer>
              <div class="flex justify-end">
                <NTooltip>
                  <template #trigger>
                    <NButton
                      type="error"
                      size="small"
                      class="rounded-full"
                      @click="
                        confirm('删除项目经历', `确定删除项目经历${proj.name}`, 'warning').then(
                          (ok) => {
                            if (ok) {
                              data.splice(idx, 1)
                            }
                          }
                        )
                      "
                    >
                      <span class="icon-[carbon--trash-can]" />
                    </NButton>
                  </template>
                  <template #default> 删除 </template>
                </NTooltip>
              </div>
            </template>
          </NCard>
        </div>
      </div>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import {
  FormInst,
  FormRules,
  NButton,
  NCard,
  NDatePicker,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NTooltip
} from 'naive-ui'
import { shallowRef, ref } from 'vue'
import confirm from '../../../components/confirm'

const data = ref<OptionalProject[]>([])
const formRefs = shallowRef<FormInst[]>([])

const rules = (idx: number): FormRules => ({
  start: {
    required: true,
    message: '开始时间不能为空',
    trigger: 'blur'
  },
  end: [
    {
      required: true,
      message: '结束时间不能为空',
      trigger: 'blur'
    },
    {
      validator: () => {
        const { start, end } = data.value[idx]
        if (start !== undefined && end !== undefined && start > end) {
          return new Error('开始时间不得早于结束时间')
        }
      },
      trigger: 'blur'
    }
  ],
  description: {
    message: '描述内容不得超过128个字符',
    trigger: 'blur',
    validator: () => {
      const description = data.value[idx].description
      if (description !== undefined && description.length > 128) {
        return new Error('描述不能超过128个字符')
      }
    }
  }
})

defineExpose({ formRefs })
</script>

<script lang="ts">
export interface Project {
  name: string
  role?: string
  start: string
  end: string
  link?: string
  description?: string
}

export type OptionalProject = Partial<Project>
</script>
