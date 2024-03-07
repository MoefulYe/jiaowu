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
                  <NFormItemGi label="描述" path="description" :span="24">
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
import { shallowRef } from 'vue'
import confirm from '../../../components/confirm'
import { FormInst } from 'naive-ui'

const data = defineModel<OptionalInternship[]>({ required: true })
const formRefs = shallowRef<FormInst[]>([])

const rules = (i: number): FormRules => ({
  company: {
    required: true,
    message: '公司不能为空',
    trigger: 'blur'
  },
  position: {
    required: true,
    message: '职位不能为空',
    trigger: 'blur'
  },
  start: [
    {
      required: true,
      message: '开始时间不能为空',
      trigger: 'blur'
    }
  ],
  end: [
    {
      required: true,
      message: '结束时间不能为空',
      trigger: 'blur'
    },
    {
      message: '结束时间不能早于开始时间',
      validator: () => {
        const { start, end } = data.value[i]
        if (start !== undefined && end !== undefined && start > end) {
          return new Error('结束时间不能早于开始时间')
        }
      },
      trigger: 'blur'
    }
  ],
  description: {
    message: '描述不能超过128个字符',
    trigger: 'blur',
    validator: () => {
      const description = data.value[i].description
      if (description !== undefined && description.length > 128) {
        return new Error('描述不能超过128个字符')
      }
    }
  }
})

defineExpose({ formRefs })
</script>

<script lang="ts">
export interface Internship {
  company: string
  position: string
  start: string
  end: string
  description: string
}

export type OptionalInternship = Partial<Internship>
</script>
