<template>
  <div v-if="profile === undefined" class="flex items-center justify-center w-full h-full">
    <span class="icon-[line-md--loading-loop] text-4xl" />
  </div>
  <div v-else class="p-6">
    <NH2 class="flex justify-center"> 求职者{{ profile.basic.name ?? '未知' }}的简历 </NH2>
    <NH3 class="flex items-center gap-1">
      <span class="icon-[iconamoon--profile-light]" />
      基本信息
    </NH3>
    <div class="flex flex-col gap-2">
      <div
        v-for="[key, label] of basicProfileMap.filter(([key]) => profile!.basic[key] !== null)"
        :key="key"
      >
        <span class="font-bold">{{ label }}：</span>
        <span>
          {{ profile!.basic[key] }}
        </span>
      </div>
    </div>
    <NHr />
    <NH3 class="flex items-center gap-1">
      <span class="icon-[fluent-mdl2--education]" />
      学业信息
    </NH3>
    <div class="flex flex-col gap-2">
      <div
        v-for="[key, label] of educationalProfileMap.filter(
          ([key]) => profile!.education[key] !== null
        )"
        :key="key"
      >
        <span class="font-bold">{{ label }}：</span>
        <span>
          {{ profile!.education[key] }}
        </span>
      </div>
    </div>
    <NHr />
    <NH3 class="flex items-center gap-1">
      <span class="icon-[ph--read-cv-logo-light]" />
      简历信息
    </NH3>
    <div class="flex flex-col gap-2">
      <div class="flex flex-wrap gap-2 items-center">
        <span class="font-bold"> 投递方向： </span>
        <NTag v-for="direction of profile!.resume.directions" :key="direction" type="primary">
          {{ direction }}
        </NTag>
      </div>
      <div class="flex flex-wrap gap-2 items-center">
        <span class="font-bold"> 掌握技能： </span>
        <NTag v-for="skill of profile!.resume.skills" :key="skill" type="primary">
          {{ skill }}
        </NTag>
      </div>
      <div v-if="profile.resume!.internships.length !== 0">
        <div class="font-bold">实习经历：</div>
        <NOl>
          <NLi
            v-for="{ company, position, start, end, description } of profile.resume!.internships"
            :key="company"
          >
            <div>
              <span class="font-bold">公司：</span>
              <span>{{ company }}</span>
            </div>
            <div>
              <span class="font-bold">职位：</span>
              <span>{{ position }}</span>
            </div>
            <div>
              <span class="font-bold">开始时间：</span>
              <span>{{ start }}</span>
            </div>
            <div>
              <span class="font-bold">结束时间：</span>
              <span>{{ end }}</span>
            </div>
            <div>
              <span class="font-bold">描述：</span>
              <div>{{ description }}</div>
            </div>
          </NLi>
        </NOl>
      </div>
      <div v-if="profile.resume!.projects.length !== 0">
        <div class="font-bold">项目经历：</div>
        <NOl>
          <NLi
            v-for="{ name, role, start, end, link, description } of profile.resume!.projects"
            :key="name"
          >
            <div>
              <span class="font-bold">项目名：</span>
              <span>{{ name }}</span>
            </div>
            <div>
              <span class="font-bold">角色：</span>
              <span>{{ role }}</span>
            </div>
            <div>
              <span class="font-bold">开始时间：</span>
              <span>{{ start }}</span>
            </div>
            <div>
              <span class="font-bold">结束时间：</span>
              <span>{{ end }}</span>
            </div>
            <div>
              <span class="font-bold">链接：</span>
              <span>{{ link }}</span>
            </div>
            <div>
              <span class="font-bold">描述：</span>
              <div>{{ description }}</div>
            </div>
          </NLi>
        </NOl>
      </div>
      <div v-if="profile.resume!.competitions.length !== 0">
        <div class="font-bold">参与竞赛：</div>
        <NUl>
          <NLi
            v-for="{ name, prize } of profile.resume!.competitions"
            :key="name"
            class="flex gap-4"
          >
            <span>
              <span class="font-bold">名称：</span>
              <span>{{ name }}</span>
            </span>
            <span>
              <span class="font-bold">获奖情况：</span>
              <span>{{ prizeMap(prize) }}</span>
            </span>
          </NLi>
        </NUl>
      </div>
      <NHr />
      <NButton type="primary" @click="downloadAttachment" :disabled="downloading">
        <template #icon>
          <span class="icon-[line-md--loading-loop]" v-if="downloading" />
          <span class="icon-[icomoon-free--attachment]" v-else />
        </template>
        <template #default> 下载简历附件 </template>
      </NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { downloadEmployeeResumeAttachment, fetchEmployeeProfileById } from '@/api/employee'
import { Profile } from '@/api/user/profile'
import { prizeMap } from '@/api/user/resume'
import { NButton, NH2, NH3, NHr, NLi, NOl, NTag, NUl } from 'naive-ui'
import { ref, shallowRef } from 'vue'

const profile = shallowRef<Profile>()
const downloading = ref(false)

const fetch = async (id: number) => {
  profile.value = await fetchEmployeeProfileById(id)
}

const downloadAttachment = async () => {
  downloading.value = true
  await downloadEmployeeResumeAttachment(profile.value!.basic.userId)
  downloading.value = false
}

defineExpose({ fetch })
</script>

<script lang="ts">
type BasicKey = keyof Profile['basic']
const basicProfileMap: [BasicKey, string][] = [
  ['userId', '编号'],
  ['name', '姓名'],
  ['gender', '性别'],
  ['birthday', '出生日期'],
  ['phone', '电话'],
  ['email', '邮箱'],
  ['code', '学号']
]

type EducationalKey = keyof Profile['education']
const educationalProfileMap: [EducationalKey, string][] = [
  ['studentType', '学历'],
  ['school', '就读学校'],
  ['college', '专业'],
  ['classNumber', '班级'],
  ['enrollmentDate', '入学日期'],
  ['duration', '学制'],
  ['graduationDate', '毕业日期']
]
</script>
