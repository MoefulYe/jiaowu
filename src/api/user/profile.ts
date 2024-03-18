import service from '@/util/requests'

export const enum Gender {
  Female = '女',
  Male = '男'
}

export const enum StudentType {
  Undergraduate = '本科生',
  Graduate = '研究生'
}

export interface BasicInfo {
  //学号
  code?: string
  //姓名
  name?: string
  //性别
  gender?: Gender
  //出生日期
  birthday?: string
  //手机
  phone?: string
  //邮箱
  email?: string
}

//学业信息
export interface AcademicInfo {
  //学生类别 本科生？研究生？
  studentType?: StudentType
  //入学日期
  enrollmentDate?: string
  //学制
  duration?: number
  //毕业日期
  graduationDate?: string
  //学校
  school?: string
  //学院
  college?: string
  //班级
  classNumber?: string
}

export const fetchBasicInfo = (): Promise<BasicInfo> =>
  service({
    method: 'GET',
    url: '/user/profile/basic'
  })

export const modifyBasicInfo = (data: BasicInfo): Promise<void> =>
  service({
    method: 'POST',
    url: '/user/profile/basic',
    data
  })

export const fetchAcademicInfo = (): Promise<AcademicInfo> =>
  service({
    method: 'GET',
    url: '/user/profile/education'
  })

export const modifyAcademicInfo = (data: AcademicInfo): Promise<void> =>
  service({
    method: 'POST',
    url: '/user/profile/education',
    data
  })
