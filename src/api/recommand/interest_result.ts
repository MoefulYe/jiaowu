import { type Job } from './../jobs'
import type { Score } from '@/components/emoji-radio.vue'
import { useStateStore } from '@/stores/user-state'
import service from '@/util/requests'

export type UnFulfill = { state: 'unfulfill' }
export type Recommand = { state: 'recommand'; recommend: Job[] }
export type OK = { state: 'ok' }

export type InterestResult = UnFulfill | Recommand | OK

const MIN = 5
const MAX = 15

export const fetchInterestResult = async (): Promise<InterestResult> => {
  const state = useStateStore()
  await state.fetchInterest()
  const interest = state.interest as Score[]
  // console.log(interest)
  const cnt = interest.reduce((acc, val) => (typeof val === 'number' ? acc + 1 : acc), 0)
  if (cnt < MIN) {
    return { state: 'unfulfill' }
  } else if (cnt > MAX) {
    return { state: 'ok' }
  } else {
    const recommend = (await service.get('/recommend/interest')) as Job[]
    return { state: 'recommand', recommend }
  }
}
