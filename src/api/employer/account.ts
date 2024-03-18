import { request } from "@/util/requests"

export type Token = string

interface Data {
  phone: string,
  password: string
}

export type RegisterData = Data & {
  code: string
}
export type LoginData = Data 

export const login = (data: LoginData): Promise<Token> => 
  request({
    method: 'POST',
    url: '/employer/account/login',
    data
  })

export const register = (data: RegisterData): Promise<Token> =>
  request({
    method: 'POST',
    url: '/employer/account/register',
    data
  })