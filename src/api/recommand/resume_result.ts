import { useStateStore } from '@/stores/user-state'
import type { Job } from '../jobs'
import service from '@/util/requests'
export type Skill = string

export type MatchResult = {
  direction: Job
  matchSkills: Skill[]
  shortboardSkills: Skill[]
  score: number
  interpretation: string
}[]

export const enum ResumeResultState {
  unfulfill,
  ambiguity,
  match
}

export type ResumeResult =
  | [ResumeResultState.unfulfill]
  | [ResumeResultState.ambiguity, Job[]]
  | [ResumeResultState.match, MatchResult]

export const fetchResumeResult = async () : Promise<ResumeResult> => {
  const state = useStateStore()
  state.fetchResume()
  if (state.resume!.skills.length === 0) {
    return [ResumeResultState.unfulfill] 
  } else if (state.resume!.directions.length === 0) {
    const jobs = await service.get('/recommend/position/ambiguity') as Job[]
    return [ResumeResultState.ambiguity, jobs]
  } else {
    const result = await service.get('/recommend/position/match',{
      timeout: 10 * 60 * 1000
    }) as MatchResult
    // const result = [{"userId":null,"direction":"前端","matchSkills":["vue"],"score":0.7,"shortboardSkills":null,"interpretation":null},{"userId":null,"direction":"后端","matchSkills":[],"score":0.0,"shortboardSkills":null,"interpretation":null}]
    return [ResumeResultState.match, result]
    
  }
}
