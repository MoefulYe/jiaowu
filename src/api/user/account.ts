import { request } from '@/util/requests'

export type Token = string
// 注册或者登录提交的表单
interface Data {
  phone: string
  password: string
}

export type RegisterData = Data
export type LoginData = Data

export const login = (data: LoginData): Promise<Token> =>
  request({
    method: 'POST',
    url: '/user/account/login',
    data
  })

export const register = (data: RegisterData): Promise<Token> =>
  request({
    method: 'POST',
    url: '/user/account/register',
    data
  })
