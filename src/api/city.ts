import type { SelectOption } from 'naive-ui'

export const CITIES: City[] = [
  '杭州',
  '北京',
  '上海',
  '深圳',
  '南京',
  '武汉',
  '广州',
  '苏州',
  '天津',
  '西安',
  '厦门',
  '成都',
  '合肥',
  '郑州',
  '重庆',
  '长沙'
]

export const CITY_OPTS: SelectOption[] = CITIES.map((city) => ({
  label: city,
  value: city
}))

export const DEFAULT_CITY = '杭州'
export type City =
  | '杭州'
  | '北京'
  | '上海'
  | '深圳'
  | '南京'
  | '武汉'
  | '广州'
  | '苏州'
  | '天津'
  | '西安'
  | '厦门'
  | '成都'
  | '合肥'
  | '郑州'
  | '重庆'
  | '长沙'
