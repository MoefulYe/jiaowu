<template>
  <NCard>
    <template #default>
      <div class="flex flex-col gap-2">
        <NCard
          v-for="(competition, idx) of data"
          :key="idx"
          class="flex justify-between items-center"
        >
          <NForm :rules="rules(idx)" v-model="data[idx]" ref="formRefs" inline>
            <NFormItem required label="比赛名" path="name">
              <NInput v-model:value="competition.name" />
            </NFormItem>
            <NFormItem required label="奖项" path="prize">
              <NRadioGroup v-model:value="competition.prize">
                <NRadioButton
                  v-for="{ label, value } of prizes"
                  :key="value"
                  :value="value"
                  size="small"
                >
                  {{ label }}</NRadioButton
                >
              </NRadioGroup>
            </NFormItem>
            <NFormItem>
              <NTooltip>
                <template #trigger>
                  <NButton
                    type="error"
                    size="small"
                    class="rounded-full"
                    @click="
                      confirm(
                        '删除项目经历',
                        `确定删除比赛经历${competition.name}`,
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
            </NFormItem>
          </NForm>
        </NCard>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <NTooltip>
          <template #trigger>
            <NButton type="primary" class="rounded-full" size="small" @click="data.push({})">
              <span class="icon-[material-symbols--add]" />
            </NButton>
          </template>
          <template #default> 添加比赛经历 </template>
        </NTooltip>
      </div>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import {
  type FormRules,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NTooltip,
  NRadioGroup,
  NRadioButton
} from 'naive-ui'
import type { FormInst } from 'naive-ui/lib'
import { ref } from 'vue'
import confirm from '../../../components/confirm'
const data = defineModel<OptionalCompetition[]>({ required: true })
const formRefs = ref<FormInst[]>([])
const rules = (idx: number): FormRules => ({
  name: {
    trigger: 'blur',
    validator: () => {
      if (data.value[idx].name === undefined) {
        return Error('比赛名不能为空')
      }
    }
  },
  prize: {
    trigger: 'blur',
    validator: () => {
      if (data.value[idx].prize === undefined) {
        return Error('奖项不能为空')
      }
    }
  }
})

defineExpose({ formRefs })
</script>

<script lang="ts">
export interface Competition {
  name: string
  prize: number
}
const prizes = [
  {
    value: 0,
    label: '未获奖'
  },
  {
    value: 1,
    label: '院级'
  },
  {
    value: 2,
    label: '校级'
  },
  {
    value: 3,
    label: '省级'
  },
  {
    value: 4,
    label: '国家级'
  },
  {
    value: 5,
    label: '世界级'
  }
]
export type OptionalCompetition = Partial<Competition>
</script>
