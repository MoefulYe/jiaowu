import type { Profile } from '../user/profile'
import { type Job } from './../jobs'
import service from '@/util/requests'
export interface QualifiedApplicant {
  birth?: string
  college?: string
  gender?: string
  id: number
  name?: string
  school?: string
  studentType?: string
}

export interface FetchQualifiedApplicantsParams {
  page: number
  size: number
  direction?: Job
  skills: string[]
}

export const fetchQualifiedApplicants = (
  params: FetchQualifiedApplicantsParams
): Promise<Pagination<QualifiedApplicant>> =>
  service({
    method: 'GET',
    url: '/employer/qualified',
    params
  })

export const fetchEmployeeProfileById = (id: number): Promise<Profile> =>
  service({
    method: 'GET',
    url: `/employer/${id}/profile`
  })

// export const downloadEmployeeResumeAttachment = async (id: number): Promise<void> => {
//   const res = await fetch(`http://101.37.165.19:8080/employer/${id}/profile/resume`)
//   // const filename = res.headers['Content-Disposition'].split('filename=')[1]
//   // const content = await res.blob()
//   // const a = document.createElement('a')
//   // a.setAttribute('download', filename)
//   // const href = URL.createObjectURL(content)
//   // console.log(href)
//   // a.href = href
//   // a.setAttribute('target', '_blank')
//   // a.click()
//   // URL.revokeObjectURL(href)
// }
