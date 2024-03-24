<template>
  <div class="p-2 grow flex flex-col">
    <NCard
      class="grow shadow-lg rounded-none sm:rounded-md"
      content-style="display: flex; flex-direction: column; gap: 1rem;"
    >
      <NBreadcrumb>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[ph--person-arms-spread]" />
            个人中心
          </span>
        </NBreadcrumbItem>
        <NBreadcrumbItem :clickable="false">
          <span class="flex items-center gap-1">
            <span class="icon-[ph--read-cv-logo]" />
            简历信息
          </span>
        </NBreadcrumbItem>
      </NBreadcrumb>
      <NForm ref="formRef" :rules="rules" v-model="resume">
        <NFormItem
          label="附件简历"
          path="attachments"
          required
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <NUpload :max="1" v-model:file-list="attachments" @before-upload="checkUpload">
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
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <NSelect
            v-model:value="resume!.directions"
            multiple
            filterable
            placeholder="请选择求职方向"
            :options="JOB_OPTS"
          />
        </NFormItem>
        <NFormItem
          label="技能"
          path="skills"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <NDynamicTags v-model:value="resume!.skills" type="primary" />
        </NFormItem>
        <NFormItem
          label="实习经历"
          path="internships"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <ResumeIntershipsView v-model="resume!.internships" ref="resumeRef" />
        </NFormItem>
        <NFormItem
          label="项目经历"
          path="projects"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <ResumeProjectsView v-model="resume!.projects" ref="projRef" />
        </NFormItem>
        <NFormItem
          label="竞赛经历"
          path="competitions"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <ResumeCompetitionsView v-model="resume!.competitions" ref="competitionsRef" />
        </NFormItem>
        <NFormItem
          label="自我评价"
          path="selfEvaluation"
          label-style="font-size: 1.125rem;line-height: 1.75rem;"
        >
          <NInput type="textarea" v-model:value="resume!.selfEvaluation" />
        </NFormItem>
      </NForm>
      <div class="flex gap-2">
        <NButton @click="submit">提交表单</NButton>
        <NButton
          @click="
            $router.push({
              name: 'recommand',
              query: { kind: Kind.简历推荐 }
            })
          "
          >查看推荐</NButton
        >
      </div>
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
  type UploadFileInfo,
  NBreadcrumb,
  NBreadcrumbItem
} from 'naive-ui'
import { ref, shallowRef } from 'vue'
import ResumeIntershipsView from './resume-interships-view.vue'
import ResumeProjectsView from './resume-projects-view.vue'
import ResumeCompetitionsView from './resume-competitions-view.vue'
import { JOB_OPTS } from '@/api/jobs'
import { submitResume } from '@/api/user/resume'
import { useStateStore } from '@/stores/user-state'
import { storeToRefs } from 'pinia'
import { Kind } from '../../recommend-view/recommand-view.vue'

const state = useStateStore()
await state.fetchResume()
const { resume } = storeToRefs(state)
const attachments = ref<UploadFileInfo[]>([])
const submit = async () => {
  try {
    await formRef.value?.validate()
    await submitResume(resume.value!, attachments.value)
  } catch {
    return
  }
}
const formRef = shallowRef<FormInst>()
const resumeRef = shallowRef<InstanceType<typeof ResumeIntershipsView>>()
const projRef = shallowRef<InstanceType<typeof ResumeProjectsView>>()
const competitionsRef = shallowRef<InstanceType<typeof ResumeCompetitionsView>>()
const rules: FormRules = {
  attachments: {
    trigger: 'blur',
    validator: () => {
      if (attachments.value.length === 0) {
        return Promise.reject(new Error('请上传个人简历'))
      }
    }
  },
  skills: {
    trigger: 'blur',
    validator: () => {
      if (resume.value!.skills.length === 0) {
        return Promise.reject(new Error('请选择技能'))
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
  },
  selfEvaluation: {
    trigger: 'blur',
    validator: () => {
      const text = resume.value!.selfEvaluation
      if (text.length <= 32) {
        return Error('自我评价内容过短')
      } else if (text.length > 512) {
        return Error('自我评价内容过长')
      }
    }
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
