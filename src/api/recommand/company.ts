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

// 公司
export const companies = [
  '字节跳动',
  '阿里巴巴',
  '腾讯',
  '美团',
  '滴滴',
  '京东',
  '华为',
  '网易',
  '小米',
  '快手',
  '拼多多',
  '今日头条',
  '携程',
  '百度',
  '微软',
  '亚马逊',
  '谷歌',
] as const

export type Company = (typeof companies)[number]