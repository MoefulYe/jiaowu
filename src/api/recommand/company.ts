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

export interface InitialChoiceParams {
  city: string
  jobName: string
}

export interface RelateCompanies {
  region: string
  jobName: string
  companyList: string[]
}

export const fetchRelateJob = (params: RelateJobParams): Promise<RelateCompanies[]> =>
  request({
    method: 'GET',
    url: '/recommend/company/relate_job',
    params
  })

export const fetchRelateRegion = (params: RelateRegionParams): Promise<RelateCompanies[]> =>
  request({
    method: 'GET',
    url: '/recommend/company/relate_region',
    params
  })

export const fetchInitialChoice = (params: InitialChoiceParams): Promise<RelateCompanies> =>
  request({
    method: 'GET',
    url: '/recommend/company/initial_choice',
    params
  })
