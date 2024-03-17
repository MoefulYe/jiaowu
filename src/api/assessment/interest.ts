import service from '@/util/requests'

export const saveInterest = (scores: number[]): Promise<void> =>
  service({
    url: '/assessment/interest',
    method: 'POST',
    data: scores.map((score, positionId) => ({
      score,
      positionId
    }))
  })
