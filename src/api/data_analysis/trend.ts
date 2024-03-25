import { ref } from 'vue'
import dayjs from 'dayjs'
import { request } from '@/util/requests'
import type { SelectOption } from 'naive-ui'

export const DIRECTIONS = [
  '前端',
  '后端',
  '机器学习',
  '测试',
  '深度学习',
  '电子',
  '电气',
  '硬件'
] as const

export type Direction = (typeof DIRECTIONS)[number]
export const enum TimeUnit {
  Year = 'year',
  Month = 'month',
  Day = 'day'
}
export type YYYYMMDD = string

export type TrendQueryParams = {
  direction: Direction
  timeUnit: TimeUnit
  range: [YYYYMMDD, YYYYMMDD]
}

const DEFAULT_TIME_UNIT = TimeUnit.Month
const DEFAULT_DIRECTION = DIRECTIONS[0]

export const defaultTrendQueryParams = () => {
  const now = dayjs().set('date', 1)
  const aYearAgo = now.subtract(1, 'year')
  return ref<TrendQueryParams>({
    direction: DEFAULT_DIRECTION,
    timeUnit: DEFAULT_TIME_UNIT,
    range: [aYearAgo.format('YYYY-MM-DD'), now.format('YYYY-MM-DD')]
  })
}

export type TrendItem = {
  time: YYYYMMDD
  salary: number
  jobCnt: number
}

export const DIRECTION_OPTS = DIRECTIONS.map(
  (_): SelectOption => ({
    label: _,
    value: _
  })
)

export const fetchTrend = async ({
  range: [from, to],
  direction,
  timeUnit
}: TrendQueryParams): Promise<TrendItem[]> => {
  const resp = (await request({
    url: '/data_analysis/trend',
    method: 'GET',
    params: {
      from,
      to,
      direction,
      timeUnit
    }
  })) as TrendItem[]
  switch (timeUnit) {
    case TimeUnit.Day:
      return resp
    case TimeUnit.Month:
      return resp.map(({ time, salary, jobCnt }) => ({
        time: time.substring(0, 7),
        salary,
        jobCnt
      }))
    case TimeUnit.Year:
      return resp.map(({ time, salary, jobCnt }) => ({
        time: time.substring(0, 4),
        salary,
        jobCnt
      }))
  }
}
