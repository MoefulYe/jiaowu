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
        description: `这是${company}的描述\n\nsdasd`,
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
