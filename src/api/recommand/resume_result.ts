import { useStateStore } from '@/stores/user-state'
import type { Job } from '../jobs'
import service from '@/util/requests'
import type { Company } from './company'

export type Skill = string
export type Jobs = { company?: Company; job: string; url: string; rowSpan?: number }

export type MatchResult = {
  direction: Job
  matchedSkills: Skill[]
  shortboardSkills: Skill[]
  score: number
  interpretation: string
  jobs: Jobs[]
}[]

const randomJobs = (direction: Job): Jobs[] => {
  if (direction === '前端') {
    return [
      {
        company: '字节跳动',
        rowSpan: 2,
        job: '前端开发工程师',
        url: 'https://www.zhipin.com/job_detail/77f8259eca0c110d1nB-09u_EVFX.html?lid=8IgdQ0W7wnc.search.1&securityId=e3_SkcgK0VKfL-F1-uFjSWhPMAJq7aaBAMBuYxboLC45i5x3NPKiwxeBh4h8irkYCNaX1u92O86bGQF6SE6-QcSSR8LHRhpQlwwKJwbNZfAzRFkZnF0~&sessionId='
      },
      {
        job: '资深前端开发工程师',
        url: 'https://www.zhipin.com/job_detail/0c32dd01a77c14a61HZ93Nm6FVdW.html?lid=8IgdQ0W7wnc.search.3&securityId=JvXcd7xtZR9eq-h1V5APqQPccNTw5yXumOhSrPc_ENNMmgzBjp4MbX1uz0eaYlU-ocRY9zfv_qZoLkvtq8pDPgUwJPfEJ_TLCUoG6tQxE9PpErnz3A~~&sessionId='
      },
      {
        company: '阿里巴巴',
        job: '前端工程师',
        rowSpan: 1,
        url: 'https://www.zhipin.com/job_detail/eccd1755f8738b7c0HB43Ni4GFY~.html?lid=8Inhq3myY1b.search.1&securityId=Tf1gciJuRvqdE-11OYRhINlrp7S0xWKtDY2qScSUZ36iD9nrPsrg811-gVH5gPacrZwOZ9-WSCK-G-Ig-wMScpcb43LoUuXhPb8_d_joZXvN36FuHQ~~&sessionId='
      },
      {
        company: '拼多多',
        rowSpan: 1,
        job: '前端开发工程师',
        url: 'https://www.zhipin.com/job_detail/5d728de5abfa76051hd93d-9f1ps.html'
      }
    ]
  } else if (direction === '后端') {
    return [
      {
        company: '腾讯',
        rowSpan: 1,
        job: '资深搜索后端工程师',
        url: 'https://www.zhipin.com/job_detail/66a6f749389345511HB8292-FVBT.html'
      },
      {
        company: '百度',
        rowSpan: 3,
        job: '后端开发',
        url: 'https://www.zhipin.com/job_detail/bee69ab2176d00331Hd92tS1FVtW.html'
      },
      {
        company: '百度',
        job: '后端研发工程师',
        url: 'https://www.zhipin.com/job_detail/df54d9f13e5a66a21HR83N--E1JU.html'
      },
      {
        job: '后端研发工程师(J52243)',
        url: 'https://www.zhipin.com/job_detail/8c9702cd5cc1b2951XB-09u5F1BQ.html'
      },
      {
        company: '字节跳动',
        rowSpan: 1,
        job: '后端开发工程师',
        url: 'https://www.zhipin.com/job_detail/0c32dd01a77c14a61HZ93Nm6FVdW.html'
      }
    ]
  } else if (direction === '机器学习') {
    return [
      {
        company: '阿里巴巴',
        rowSpan: 1,
        job: '机器学习工程师',
        url: 'https://www.zhipin.com/job_detail/f9e4e2fd484b68e81HF629u_GFQ~.html?lid=8IUgqU6oSjH.search.1&securityId=LeR03DQF1RWE1-B16lCXQkQJUhguvWODj9jIxjQK0NLACJ1Fl0uH-wOUh0wqu-ZaUHIPlE5xE7EGb-OKYFtzJMbBMDjgh6NF8SL4hSgwACY~&sessionId='
      },
      {
        company: '华为',
        rowSpan: 2,
        job: '机器学习工程师',
        url: 'https://www.zhipin.com/job_detail/fa257cb51d7640731XZz09y8GVQ~.html?lid=8IUgqU6oSjH.search.6&securityId=-rvjYwCTYghca-e1W054B71MNh_Bo0rTK2Ls28Gx40Ek6IIW_c-FK1H-UjBOj54B2KdHZP_ipK2IVTL9UGxJe_yA3Ip9rZo3IaYnHDOZDdkE&sessionId='
      },
      {
        job: '机器学习算法工程师',
        url: 'https://www.zhipin.com/job_detail/3921612ef50631ed1Xd92t64FlRX.html?lid=8IUgqU6oSjH.search.16&securityId=cTcIL9loTEp2b-l1QVjQ1xD9_ucI4eA4RjZCpNfp0U8AdLvqq7Uf15uaKeVpzYKngbPVEDUATXWFVgLkxDcCgnY0dSMSbn1efDzFnI6zi_T7wF3jgyHo&sessionId='
      },
      {
        company: '字节跳动',
        rowSpan: 1,
        job: '机器学习平台研发工程师（火山引擎）',
        url: 'https://www.zhipin.com/job_detail/3fd2976a692ddaa71X182N-8EVVW.html?lid=8IUgqU6oSjH.search.18&securityId=zSuizYIdZXoSE-c1rw6wGBUFt_nTc6V4kcajgPL3Fl3Xaq-ApmyKQI78fQbqnGttgmYuLUeSKiGgGNDx6xeeOuugHg1bdB9ruridORxlcKf8UK4F&sessionId='
      }
    ]
  } else {
    return []
  }
}

export const enum ResumeResultState {
  unfulfill,
  ambiguity,
  match
}

export type ResumeResult =
  | [ResumeResultState.unfulfill]
  | [ResumeResultState.ambiguity, Job[]]
  | [ResumeResultState.match, MatchResult]

export const fetchResumeResult = async (): Promise<ResumeResult> => {
  const state = useStateStore()
  state.fetchResume()
  if (state.resume!.skills.length === 0) {
    return [ResumeResultState.unfulfill]
  } else if (state.resume!.directions.length === 0) {
    const jobs = (await service.get('/recommend/position/ambiguity')) as Job[]
    return [ResumeResultState.ambiguity, jobs]
  } else {
    const result = (await service.get('/recommend/position/match', {
      timeout: 10 * 60 * 1000
    })) as MatchResult
    result.forEach((item) => {
      const interpretation = item.interpretation
      const idx = interpretation.indexOf('1.')
      if (idx !== -1) {
        item.interpretation = interpretation.slice(idx)
      }
      item.jobs = randomJobs(item.direction)
    })
    return [ResumeResultState.match, result]
  }
}
