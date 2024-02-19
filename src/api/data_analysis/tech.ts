import { request } from '@/util/requests'

export interface TechEntry {
  techName: string
  rate: number
}

export interface Tech {
  region: string
  jobName: string
  techRateList: TechEntry[]
}

export type Techs = Tech[]

const normalize_tech = (tech: Tech): Tech => {
  const sum = tech.techRateList.reduce((acc, entry) => acc + entry.rate, 0)
  tech.techRateList.forEach((entry) => (entry.rate /= sum))
  return tech
}

const normalize_techs = (techs: Techs): Techs => {
  techs.forEach((tech) => normalize_tech(tech))
  return techs
}

export interface TechInitialChoiceParams {
  city: string
  jobName: string
}

export const fetchTechInitialChoice = (params: TechInitialChoiceParams): Promise<Tech> =>
  request({
    method: 'GET',
    url: '/data_analysis/tech/initial_choice',
    params
  }).then((ok) => normalize_tech(<Tech>ok))

export interface TechCompareJobParams {
  city: string
  jobName: string
  choiceList: string[]
}

export const fetchTechCompareJob = (params: TechCompareJobParams): Promise<Techs> =>
  request({
    method: 'GET',
    url: '/data_analysis/tech/compare_job',
    params
  }).then((ok) => normalize_techs(<Techs>ok))

export interface TechCompareRegionParams {
  city: string
  jobName: string
  choiceList: string[]
}
export const fetchCompareRegion = (params: TechCompareRegionParams): Promise<Techs> =>
  request({
    method: 'GET',
    url: '/data_analysis/tech/compare_region',
    params
  }).then((ok) => normalize_techs(<Techs>ok))
