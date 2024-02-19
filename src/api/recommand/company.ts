import { request } from '@/util/requests'

export interface RelateJobParams {
  city: string
  jobName: string
  choiceList: string[]
}

export interface RelateRegionParams {
  city: string
  jobName: string
  choiceList: string[]
}

export interface RalateCompanies {
  region: string
  jobName: string
  companyList: string[]
}

export const fetchRelateJob = (params: RelateJobParams): Promise<RalateCompanies[]> =>
  request({
    method: 'GET',
    url: '/data_analysis/company/relate_job',
    params
  })

export const fetchRelateRegion = (params: RelateRegionParams): Promise<RalateCompanies[]> =>
  request({
    method: 'GET',
    url: '/data_analysis/company/relate_region',
    params
  })
