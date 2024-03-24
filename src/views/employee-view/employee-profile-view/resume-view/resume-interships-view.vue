<template>
  <NCard>
    <template #header>
      <div class="p-2 flex justify-end items-center">
        <NTooltip>
          <template #trigger>
            <NButton
              type="primary"
              class="rounded-full"
              size="small"
              @click="
                () => {
                  data.push({})
                }
              "
            >
              <span class="icon-[material-symbols--add]" />
            </NButton>
          </template>
          <template #default> 添加实习经历 </template>
        </NTooltip>
      </div>
    </template>
    <template #default>
      <div class="flex flex-col gap-4">
        <div v-for="(internship, idx) of data" :key="idx">
          <NCard>
            <template #default>
              <NForm :rules="rules(idx)" v-model="data[idx]" ref="formRefs">
                <NGrid :cols="24" :x-gap="8">
                  <NFormItemGi label="公司" path="company" required :span="12">
                    <NInput v-model:value="internship.company" />
                  </NFormItemGi>
                  <NFormItemGi label="职位" path="position" required :span="12">
                    <NInput v-model:value="internship.position" />
                  </NFormItemGi>
                  <NFormItemGi label="开始时间" path="start" required :span="12">
                    <NDatePicker
                      type="month"
                      v-model:formatted-value="internship.start"
                      :is-date-disabled="(ts: number) => ts > Date.now()"
                    />
                  </NFormItemGi>
                  <NFormItemGi label="结束时间" path="end" required :span="12">
                    <NDatePicker
                      type="month"
                      v-model:formatted-value="internship.end"
                      :is-date-disabled="(ts: number) => ts > Date.now()"
                    />
                  </NFormItemGi>
                  <NFormItemGi label="描述" path="description" required :span="24">
                    <NInput v-model:value="internship.description" type="textarea" clearable />
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
                        confirm(
                          '删除实习经历',
                          `确定删除${internship.company}的实习经历`,
                          'warning'
                        ).then((ok) => {
                          if (ok) {
                            data.splice(idx, 1)
                          }
                        })
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
  type FormRules,
  NButton,
  NCard,
  NDatePicker,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NTooltip,
  type FormInst
} from 'naive-ui'
import { shallowRef } from 'vue'
import confirm from '@/components/confirm'
import { type OptionalInternship } from '@/api/user/resume'

const data = defineModel<OptionalInternship[]>({ required: true })
const formRefs = shallowRef<FormInst[]>([])

const rules = (idx: number): FormRules => ({
  company: {
    trigger: 'blur',
    validator: () => {
      if (data.value[idx].company === undefined) {
        return Error('公司不能为空')
      }
    }
  },
  position: {
    trigger: 'blur',
    validator: () => {
      if (data.value[idx].position === undefined) {
        return Error('职位不能为空')
      }
    }
  },
  start: {
    trigger: 'blur',
    validator: () => {
      if (data.value[idx].start === undefined) {
        return Error('开始时间不能为空')
      }
    }
  },
  end: {
    validator: () => {
      const { start, end } = data.value[idx]
      if (end === undefined) {
        return Error('结束时间不得唯恐')
      } else if (start !== undefined && start > end) {
        return Error('结束时间不得早于开始时间')
      }
    },
    trigger: 'blur'
  },
  description: {
    trigger: 'blur',
    validator: () => {
      const description = data.value[idx].description
      if (description === undefined || description.length <= 32) {
        return Error('描述内容过少')
      } else if (description.length > 256) {
        return Error('描述不得超过128字')
      }
    }
  }
})

defineExpose({ formRefs })
</script>
