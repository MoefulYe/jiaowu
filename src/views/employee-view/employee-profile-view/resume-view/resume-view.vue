<template>
  <div class="p-2 grow flex flex-col">
    <NCard class="grow shadow-lg rounded-lg">
      <NForm ref="formRef" :rules="rules" v-model="data">
        <NFormItem
          label="附件简历"
          path="attachments"
          required
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <NUpload :max="1" v-model:file-list="data.attachments" @before-upload="checkUpload">
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
            :options="JOB_OPTS"
          />
        </NFormItem>
        <NFormItem label="技能" label-style="font-size: 1.125rem;line-height: 1.75rem;">
          <NDynamicTags v-model:value="data.skills" type="primary" />
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
        <NFormItem
          label="竞赛经历"
          path="competitions"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <ResumeCompetitionsView v-model="data.competitions" ref="competitionsRef" />
        </NFormItem>
        <NFormItem
          label="自我评价"
          path="selfEvaluation"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <NInput
            type="textarea"
            maxlength="256"
            minlength="32"
            v-model:value="data.selfEvaluation"
          />
        </NFormItem>
      </NForm>
      <NButton @click="submit">提交</NButton>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import {
  type FormInst,
  type FormRules,
  NButton,
  NCard,
  NDynamicTags,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NUpload,
  NUploadDragger,
  type UploadFileInfo
} from 'naive-ui'
import { shallowRef } from 'vue'
import ResumeIntershipsView from './resume-interships-view.vue'
import ResumeProjectsView from './resume-projects-view.vue'
import ResumeCompetitionsView from './resume-competitions-view.vue'
import { JOB_OPTS } from 'api/jobs'
import { defaultResumeProfile, submitResume } from 'api/user/resume'

const formRef = shallowRef<FormInst>()
const resumeRef = shallowRef<InstanceType<typeof ResumeIntershipsView>>()
const projRef = shallowRef<InstanceType<typeof ResumeProjectsView>>()
const competitionsRef = shallowRef<InstanceType<typeof ResumeCompetitionsView>>()
const rules: FormRules = {
  doc: {
    trigger: 'blur',
    validator: () => {
      if (data.value.attachments.length === 0) {
        return Promise.reject(new Error('请上传个人简历'))
      }
    }
  },
  directions: {
    trigger: 'blur',
    validator: () => {
      if (data.value.directions.length === 0) {
        return Promise.reject(new Error('至少选择一个投递方向'))
      }
    }
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
  },
  competitions: {
    trigger: 'blur',
    asyncValidator: () =>
      Promise.all(competitionsRef.value!.formRefs.map((form) => form.validate())).then(() => {})
  }
}
const data = defaultResumeProfile()
const submit = async () => {
  try {
    await formRef.value?.validate()
    await submitResume(data.value)
  } catch {
    return
  }
}
</script>

<script lang="ts">
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
    !type.includes('html') &&
    !type.includes('text')
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
