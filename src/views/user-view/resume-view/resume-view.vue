<template>
  <div class="p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-lg">
      <NForm ref="formRef" :rules="rules" v-model="data">
        <NFormItem
          label="附件简历"
          path="doc"
          required
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <NUpload :max="1" v-model:file-list="data.doc" @before-upload="checkUpload">
            <NUploadDragger>
              <div class="flex flex-col items-center">
                <div class="icon-[ri--upload-cloud-2-line] text-2xl" />
                <div class="opacity-80 text-sm">上传个人简历</div>
                <div class="opacity-60 text-xs">
                  支持pdf, doc, docx, ppt, pptx, png, jpg, jpeg, html
                </div>
              </div>
            </NUploadDragger>
          </NUpload>
        </NFormItem>
        <NFormItem
          label="求职方向"
          path="directions"
          required
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <NSelect
            v-model:value="data.directions"
            multiple
            filterable
            placeholder="请选择求职方向"
            :options="
              jobs.map((job) => ({
                value: job,
                label: job
              }))
            "
          />
        </NFormItem>
        <NFormItem label="技能" label-style="font-size: 1.125rem;line-height: 1.75rem;">
          <NDynamicTags v-model:value="data.skills" />
        </NFormItem>
        <NFormItem
          label="实习经历"
          path="internships"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <ResumeIntershipsView v-model="data.internships" ref="resumeRef" />
        </NFormItem>
        <NFormItem
          label="项目经历"
          path="projects"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <ResumeProjectsView v-model="data.projects" ref="projRef" />
        </NFormItem>
      </NForm>
    </NCard>
    <NButton @click="formRef?.validate()" />
  </div>
</template>

<script setup lang="ts">
import {
  FormInst,
  FormRules,
  NButton,
  NCard,
  NDynamicTags,
  NForm,
  NFormItem,
  NSelect,
  NUpload,
  NUploadDragger,
  UploadFileInfo
} from 'naive-ui'
import { Ref, ref, shallowRef } from 'vue'
import type { OptionalInternship } from './resume-interships-view.vue'
import ResumeIntershipsView from './resume-interships-view.vue'
import { jobs } from '../../../api/mock'
import ResumeProjectsView, { OptionalProject } from './resume-projects-view.vue'

const formRef = shallowRef<FormInst>()
const resumeRef = shallowRef<InstanceType<typeof ResumeIntershipsView>>()
const projRef = shallowRef<InstanceType<typeof ResumeProjectsView>>()
const rules: FormRules = {
  doc: {
    required: true,
    trigger: ['change', 'blur'],
    type: 'array',
    min: 1,
    message: '未上传简历'
  },
  directions: {
    type: 'array',
    trigger: 'blur',
    min: 1,
    message: '至少选择一个投递方向'
  },
  internships: {
    trigger: 'blur',
    asyncValidator: () =>
      Promise.all(resumeRef.value!.formRefs.map((form) => form.validate())).then(() => {})
  },
  projects: {
    trigger: 'blur',
    asyncValidator: () =>
      Promise.all(projRef.value!.formRefs.map((form) => form.validate())).then(() => {})
  }
}
const data = defaultResume()
</script>

<script lang="ts">
export interface Resume {
  doc: UploadFileInfo[]
  directions: string[]
  skills: string[]
  internships: OptionalInternship[]
  projects: OptionalProject[]
  competitions: {
    name: string
    price: string
    description?: string
  }[]
  creds: {
    name: string
    description?: string
  }[]
  languages: {
    name: Language
    proficiency: Proficiency
  }[]
  selfEvaluation: string
}

export enum Language {
  English = '英语',
  Japanese = '日语',
  French = '法语',
  German = '德语',
  Spanish = '西班牙语',
  Russian = '俄语',
  Korean = '韩语',
  Arabic = '阿拉伯语',
  Portuguese = '葡萄牙语',
  Italian = '意大利语',
  Dutch = '荷兰语'
}

export type Proficiency = 1 | 2 | 3 | 4 | 5

const defaultResume = (): Ref<Resume> =>
  ref({
    doc: [],
    directions: [],
    skills: [],
    selfEvaluation: '',
    internships: [],
    projects: [],
    competitions: [],
    creds: [],
    languages: []
  })

const checkDocMimeType = (type?: string | null) => {
  //支持pdf, doc, docx, ppt, pptx, png, jpg, jpeg, html
  if (type === null) {
    window.$message.error('文件类型不支持')
    return false
  } else if (type === undefined) {
    window.$message.error('文件类型不支持')
    return false
  } else if (
    !type.includes('pdf') &&
    !type.includes('doc') &&
    !type.includes('docx') &&
    !type.includes('ppt') &&
    !type.includes('pptx') &&
    !type.includes('png') &&
    !type.includes('jpg') &&
    !type.includes('jpeg') &&
    !type.includes('html')
  ) {
    window.$message.error('文件类型不支持')
    return false
  } else {
    return true
  }
}

const checkUpload = ({ file }: { file: UploadFileInfo }) => {
  if (!checkDocMimeType(file.type)) {
    return false
  }
  const size = file.file?.size
  if (size !== undefined && size > MAX_UPLOAD_SIZE) {
    window.$message.warning('最大上传4MB的附件')
    return false
  }
  return true
}

const MAX_UPLOAD_SIZE = 1 << 22
</script>
