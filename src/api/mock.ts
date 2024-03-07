export const jobs = [
  '后端',
  '前端',
  '全栈',
  '测试',
  '运维',
  '产品',
  'UI',
  '运营',
  '销售',
  'java',
  'python',
  'dl',
  'ml'
]

export const cities = [
  '北京',
  '上海',
  // '广州',
  '深圳',
  '杭州'
  // '温州',
  // '苏州',
  // '南京',
  // '成都',
  // '武汉',
  // '西安'
]

export const fetchCities = async (): Promise<string[]> => {
  window.$loading.start()
  return new Promise((resolve) =>
    setTimeout(() => {
      window.$loading.finish()
      resolve(cities)
    }, 50)
  )
}

// const companies = [
//   '腾讯',
//   '阿里巴巴',
//   '百度',
//   '字节跳动',
//   '美团',
//   '京东',
//   '华为',
//   '网易',
//   '小米',
//   '滴滴'
// ]
