import { useStateStore } from '@/stores/user-state'
import type { BriefProfile, Profile } from '../user/profile'
import { type Job } from './../jobs'
import service from '@/util/requests'
import axios from 'axios'
import download from '@/util/download'

export interface FetchQualifiedApplicantsParams {
  page: number
  size: number
  direction?: Job
  skills: string[]
}

export const fetchQualifiedApplicants = (
  params: FetchQualifiedApplicantsParams
): Promise<Pagination<BriefProfile>> =>
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

export const downloadEmployeeResumeAttachment = async (id: number): Promise<void> => {
  const resp = await axios.get(
    `${import.meta.env.VITE_AXIOS_BASE_URL}/employer/${id}/profile/attachment`,
    {
      headers: {
        token: useStateStore().token()
      }
    }
  )
  if ((resp.headers['content-type'] as string).indexOf('octet-stream') === -1) {
    throw new Error(`not such employee\`${id}\``)
  } else {
    const filename = resp.headers['content-disposition'].split('filename=')[1]
    const blob = new Blob([resp.data], { type: 'application/octet-stream' })
    download(filename, blob)
  }
}
