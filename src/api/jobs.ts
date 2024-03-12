import type { SelectOption } from 'naive-ui'

export const JOBS = [
  '深度学习',
  '机器学习',
  '产品',
  '前端',
  '后端',
  '测试',
  '运维',
  '运营',
  '销售',
  '电子',
  '硬件',
  '电气',
  '通信',
  '行政',
  '法务',
  '会计',
  '设计',
  '机械',
  '金融',
  '管理'
]

export const JOB_OPTS: SelectOption[] = JOBS.map((job) => ({
  label: job,
  value: job
}))

export const DEFAULT_JOB = '后端'