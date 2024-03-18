import service from '@/util/requests'
import type { UploadFileInfo } from 'naive-ui'
import { ref, type Ref } from 'vue'

export interface Internship {
  company: string
  position: string
  start: string
  end: string
  description: string
}

export type OptionalInternship = Partial<Internship>

export interface Project {
  name: string
  role?: string
  start: string
  end: string
  link?: string
  description: string
}

export type OptionalProject = Partial<Project>

export interface Competition {
  name: string
  prize: Prize
}

export type Prize = 0 | 1 | 2 | 3 | 4 | 5

export type OptionalCompetition = Partial<Competition>

export interface ResumeProfile {
  directions: string[]
  skills: string[]
  internships: OptionalInternship[]
  projects: OptionalProject[]
  competitions: OptionalCompetition[]
  selfEvaluation: string
}

export interface ResumeProfileWithAttachment extends ResumeProfile {
  attachments: UploadFileInfo[]
}

export const defaultResumeProfile = (): Ref<ResumeProfileWithAttachment> =>
  ref({
    attachments: [],
    directions: [],
    skills: [],
    selfEvaluation: '',
    internships: [{}],
    projects: [{}],
    competitions: [{}]
  })

export const submitResume = async ({ attachments: [attachment], ...rst }: ResumeProfileWithAttachment) =>
  service.post(
    '/user/profile/resume',
    {
      data: JSON.stringify(rst),
      resume: attachment.file
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
