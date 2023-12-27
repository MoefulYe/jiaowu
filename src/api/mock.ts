// const jobs = [
//   '后端',
//   '前端',
//   '全栈',
//   '测试',
//   '运维',
//   '产品',
//   'UI',
//   '运营',
//   '市场',
//   '销售',
//   '人事',
//   '行政',
//   '财务',
//   '法务',
//   '其他'
// ]

const jobs = ['java', 'python', 'ml', 'dl', '前端', '后端']

const cities = [
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

export const fetchJobs = async (): Promise<string[]> => {
  window.$loading.start()
  return new Promise((resolve) =>
    setTimeout(() => {
      window.$loading.finish()
      resolve(jobs)
    }, 50)
  )
}

export interface Company {
  name: string
  url: string
}

const companies: Company[] = [
  { name: '华为', url: 'https://www.huawei.com' },
  { name: '阿里巴巴', url: 'https://www.alibaba.com' },
  { name: '腾讯', url: 'https://www.tencent.com' },
  { name: '字节跳动', url: 'https://www.bytedance.com' },
  { name: '百度', url: 'https://www.baidu.com' },
  { name: '京东', url: 'https://www.jd.com' },
  { name: '美团', url: 'https://www.meituan.com' },
  { name: '滴滴', url: 'https://www.didiglobal.com' },
  { name: '小米', url: 'https://www.mi.com' },
  { name: '网易', url: 'https://www.163.com' },
  { name: '携程', url: 'https://www.ctrip.com' },
  { name: '拼多多', url: 'https://www.pinduoduo.com' },
  { name: '360', url: 'https://www.360.com' },
  { name: '新浪', url: 'https://www.sina.com.cn' }
]

export const fetchCompanies = async (): Promise<Company[]> => {
  window.$loading.start()
  return new Promise((resolve) =>
    setTimeout(() => {
      window.$loading.finish()
      resolve(companies)
    }, 50)
  )
}
