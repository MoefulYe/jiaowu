import type { Score } from '@/components/emoji-radio.vue'
import service from '@/util/requests'
import { JOBS } from '../jobs'

export const saveInterest = (scores: Score[]): Promise<void> =>
  service({
    url: '/assessment/interest',
    method: 'POST',
    data: scores.map((score, positionId) => ({
      score: score ?? 0,
      positionId
    }))
  })

export const fetchInterest = async (): Promise<Score[]> => {
  type Result = Array<0 | 1 | 2 | 3 | 4 | 5> | null
  const res = (await service({
    url: '/assessment/interest',
    method: 'GET'
  })) as Result
  if (res instanceof Array) {
    return res.map((score) => (score === 0 ? undefined : score))
  } else {
    return Array.from({ length: JOBS.length })
  }
}
