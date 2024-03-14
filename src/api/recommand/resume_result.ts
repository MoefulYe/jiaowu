import type { Job } from '../jobs'
export type Skill = string
export type UnFulfill = { state: 'unfulfill' }
export type Ambiguity = { state: 'ambiguity'; recommend: Job[] }
export type Rate =  {
  job: Job,
  matchSkills: Skill[],
  score: number
}
export type Match = {
  state: 'match'
  rates: Rate[]
}

export type ResumeResult = UnFulfill | Ambiguity | Match
