import { request } from '@/util/requests'

export interface CitySalaryAnalysisReqParams {
  /** * 输入的城市名 */
  city: string
  /** * 输入的技术类型 */
  jobName: string
}

export interface SalaryAnalysisResp {
  region: string
  jobName: string
  jobNum: number
  avgSalary: number
  maxSalary: number
  minSalary: number
  unit: string
}

export const fetchCitySalaryAnalysis = async (
  params: CitySalaryAnalysisReqParams
): Promise<SalaryAnalysisResp> =>
  request({
    method: 'GET',
    params,
    url: '/data_analysis/city_salary'
  })

export interface CountrySalaryAnalysisReqParams {
  /** * 输入的技术类型 */
  jobName: string
}

export const fetchCountrySalaryAnalysis = async (
  params: CountrySalaryAnalysisReqParams
): Promise<SalaryAnalysisResp> =>
  request({
    method: 'GET',
    params,
    url: '/data_analysis/country_salary'
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

export interface TechAnalysisResp {
  techRate: Map<string, number>
  size: number
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
  }).then((ret) => ret.cityTechStatistics)

export const fetchCountryTechAnalysis = async (
  params: CountryTechAnalysisReqParams
): Promise<TechAnalysisResp> =>
  fetchTechAnalysis({
    city: 'unknown',
    tech: params.tech
  }).then((ret) => ret.countryTechStatistics)
