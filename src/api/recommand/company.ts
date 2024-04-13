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

export const 岗位 = [
      {
        company: '字节跳动',
        rowSpan: 1,
        job: '后端开发',
        url: 'https://www.zhipin.com/job_detail/743442890fd0911e1XV-3NS1EVtZ.html?lid=8ZaEKUCw9e3.search.21&securityId=TU3ASWHrj1hQC-41UIusQlsfUadgFnodGIwEKGL8e8FwM_acYJ59NHB7FR0XWdZmwRvC5oq87jpg9XcmZq0WUsK0ZaejxIK3mwvr1tfNZ2SPDdVZ&sessionId='
      },
      {
        company: '阿里巴巴',
        rowSpan: 2,
        job: '后端开发',
        url: 'https://www.zhipin.com/job_detail/ec7002b4d22afc151Hd42tq1ElFY.html?lid=8ZdHIuNj4Uj.search.13&securityId=lDF0N5OE79_sO-d1de1vxeOs90Q690_7UQsVx9N9ZVcZLxgIoqbqvw53In0og50iZf_4i-Yk8FsRZq1y-x5op9gvid6yXyovvUB9G4t9YQYrOw~~&sessionId='
      },
      {
        job: 'java后端开发',
        url: 'https://www.zhipin.com/job_detail/db40ceba6dc5b7641nN-2d64EldX.html?lid=8ZdHIuNj4Uj.search.53&securityId=tSnetRGh_zG98-L1Hp0kmj9GGi33RP8VuBWVWyfZ41GfkSJt3NSNQ7HbnW1r9X67gSb3YQzj1GWmjLzOCu0ChqprKYlzKWCbM1xO30vNBujf&sessionId='
      },
      {
        company: '华为',
        rowSpan: 2,
        job: '后端开发工程师',
        url: 'https://www.zhipin.com/job_detail/b7da3ff687b2e9c71XN42dW-GVpQ.html?lid=8ZaEKUCw9e3.search.2&securityId=ny9JLTsuOm4zi-W128V28O-2HsKSfbyrVa-r3iRiPKdKZbVgk1fawKkK8cwSJb2yuzWCkFr4MPLY2Dc6t2RYnN3AgewVSxXmte7155096zVXbw~~&sessionId='
      },
      {
        job: '后端开发',
        url: 'https://www.zhipin.com/job_detail/4d968c099ae51a191Xd92NS9FlRQ.html?lid=8ZaEKUCw9e3.search.20&securityId=hs6PUjIrDibqA-j1JoHb5SxieeNYLEm702fuSOfCnYcJfHX1eTdrGflSoraW2KzeLJPvYGYqR1DkatYTeGDT7vWr4vjA6RyfhORh7Ftjr--8juVH7JJ8&sessionId='
      }
    ]