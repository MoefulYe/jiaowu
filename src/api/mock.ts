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

const companies = [
  '腾讯',
  '阿里巴巴',
  '百度',
  '字节跳动',
  '美团',
  '京东',
  '华为',
  '网易',
  '小米',
  '滴滴',
  '360',
  '搜狗',
  '新浪',
  '携程',
  '拼多多',
  '快手',
  '微博',
  '饿了么',
  '爱奇艺',
  '蘑菇街',
  '贝壳',
  '58同城',
  '虎牙',
  '哔哩哔哩',
  '陌陌',
  '探探',
  '猫眼',
  '大众点评',
  '去哪儿',
  '美团点评',
  '携程',
  '途牛',
  '同程',
  '驴妈妈',
  '去哪儿网',
  '飞猪',
  '艺龙',
  '携程旅行网',
  '驴妈妈旅游网',
  '同程旅游网',
  '途牛旅游网',
  '去哪儿旅游网',
  '飞猪旅行',
  '艺龙旅行网',
  '去哪儿网机票',
  '去哪儿网酒店',
  '去哪儿网火车票',
  '去哪儿网旅游',
  '去哪儿网门票',
  '去哪儿网度假',
  '去哪儿网团购',
  '去哪儿网签证',
  '去哪儿网租车',
  '去哪儿网自由行',
  '去哪儿网邮轮',
  '去哪儿网旅行攻略',
  '去哪儿网旅行保险',
  '去哪儿网旅行社'
]

export const fetchCompanies = async (): Promise<string[]> => {
  window.$loading.start()
  return new Promise((resolve) =>
    setTimeout(() => {
      window.$loading.finish()
      resolve(companies)
    }, 50)
  )
}
