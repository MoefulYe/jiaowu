export interface CompanyInfo {
  name: string
  description: string
  url: string
  //招聘网址
  recruitUrl: string
  tech: {
    name: string
    rate: number
  }[]
  salary: {
    min: number
    avg: number
    max: number
    unit: string
  }
  //岗位数量
  jobCnt: number
  //工作时间
  workTime: string
  //福利
  welfare: string[]
}

// export const fetchCompanyInfo = async (company: string): Promise<CompanyInfo> =>
//   request({
//     method: 'GET',
//     url: `/company/${company}`
//   })

export const fetchCompanyInfo = async (company: string): Promise<CompanyInfo> => {
  window.$loading.start()
  return await new Promise<CompanyInfo>((resolve) =>
    setTimeout(() => {
      window.$loading.finish()
      resolve({
        name: company,
        description: `华为创立于1987年，是全球领先的ICT（信息与通信）基础设施和智能终端提供商，我们致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界：让无处不在的联接，成为人人平等的权利；为世界提供最强算力，让云无处不在，让智能无所不及；所有的行业和组织，因强大的数字平台而变得敏捷、高效、生机勃勃；通过AI重新定义体验，让消费者在家居、办公、出行等全场景获得极致的个性化体验。目前华为约有19.4万员工，业务遍及170多个国家和地区，服务30多亿人口。`,
        url: 'https://www.baidu.com',
        recruitUrl: 'https://www.bosszhipin.com/',
        tech: [
          {
            name: 'Java',
            rate: 0.5
          },
          {
            name: 'Python',
            rate: 0.3
          },
          {
            name: 'C++',
            rate: 0.2
          }
        ],
        salary: {
          min: 10,
          avg: 15,
          max: 20,
          unit: 'K'
        },
        jobCnt: 100,
        workTime: '上午09:00 - 下午05:30',
        welfare: ['五险一金', '年终奖', '带薪年假']
      })
    }, 100)
  )
}
