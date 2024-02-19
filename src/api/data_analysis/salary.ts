import { request } from '@/util/requests'

export interface SalaryAnalysis {
  region: string
  jobName: string
  jobNum: number
  avgSalary: number
  maxSalary: number
  minSalary: number
  unit: string
}

export interface SalaryInitialChoiceParams {
  /** * 输入的城市名 */
  city: string
  /** * 输入的技术类型 */
  jobName: string
}

export const fetchSalaryInitalChoice = async (
  params: SalaryInitialChoiceParams
): Promise<SalaryAnalysis> =>
  request({
    method: 'GET',
    params,
    url: '/data_analysis/salary/initial_choice'
  })

export interface SalaryCompareJobParams {
  city: string
  jobName: string
  choiceList: string[]
}

export const fetchSalaryCompareJob = async (
  params: SalaryCompareJobParams
): Promise<SalaryAnalysis[]> =>
  request({
    method: 'GET',
    params,
    url: '/data_analysis/salary/compare_job'
  })

export interface SalaryCompareRegionParams {
  city: string
  jobName: string
  choiceList: string[]
}

export const fetchSalaryCompareReigon = async (
  params: SalaryCompareRegionParams
): Promise<SalaryAnalysis[]> =>
  request({
    method: 'GET',
    params,
    url: '/data_analysis/salary/compare_region'
  })

export interface TechAnalysisReqParams {
  /** * 输入的城市名 */
  city: string
  /** * 输入的技术类型 */
  tech: string
}

interface _TechAnalysisResp {
  countryTechStatistics: {
    techRate: Map<string, number>
    size: number
  }
  cityTechStatistics: {
    techRate: Map<string, number>
    size: number
  }
}

export interface RateEntry {
  tech: string
  rate: number
}
export interface TechAnalysisResp {
  techRate: RateEntry[]
  city: string
  job: string
}

const fetchTechAnalysis = async (params: TechAnalysisReqParams): Promise<_TechAnalysisResp> =>
  request({
    method: 'GET',
    params,
    url: '/data_analysis/tech'
  })

export interface CityTechAnalysisReqParams {
  /** * 输入的城市名 */
  city: string
  /** * 输入的技术类型 */
  tech: string
}

export interface CountryTechAnalysisReqParams {
  /** * 输入的技术类型 */
  tech: string
}
export const fetchCityTechAnalysis = async (
  params: CityTechAnalysisReqParams
): Promise<TechAnalysisResp> =>
  fetchTechAnalysis({
    city: params.city,
    tech: params.tech
  }).then((ret) => {
    const { techRate } = ret.cityTechStatistics
    const arr: RateEntry[] = []
    let sum = 0
    for (const [tech, rate] of Object.entries(techRate)) {
      sum += rate
      arr.push({
        tech,
        rate
      })
    }
    arr.forEach((entry) => {
      entry.rate /= sum
    })
    arr.sort().reverse()
    return {
      techRate: arr,
      city: params.city,
      job: params.tech
    }
  })

export const fetchCountryTechAnalysis = async (
  params: CountryTechAnalysisReqParams
): Promise<TechAnalysisResp> =>
  fetchTechAnalysis({
    city: 'unknown',
    tech: params.tech
  }).then((ret) => {
    const { techRate } = ret.countryTechStatistics
    const arr: RateEntry[] = []
    let sum = 0
    for (const [tech, rate] of Object.entries(techRate)) {
      sum += rate
      arr.push({
        tech,
        rate
      })
    }
    arr.forEach((entry) => {
      entry.rate /= sum
    })
    arr.sort().reverse()
    return {
      techRate: arr,
      city: '全国',
      job: params.tech
    }
  })
