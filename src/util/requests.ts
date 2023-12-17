import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { useTokenStore } from '../stores/token'

const service = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  timeout: 30000
})

service.interceptors.request.use(
  (config) => {
    const token = useTokenStore().token
    config.headers.Authorization = `Bearer ${token}`
    window.$loading.start()
    return config
  },
  (err) => {
    window.$loading.error()
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (response) => {
    window.$loading.finish()
    return response.data.data
  },
  (err) => {
    window.$loading.error()
    if (err.response.headers['content-type'] === 'application/json') {
      window.$message.error(err.response.data.msg)
      return Promise.reject(err.response.data.msg)
    } else if (err.response.headers['content-type'] === 'plain/text') {
      window.$message.error(err.response.data)
      return Promise.reject(err.response.data)
    } else {
      window.$message.error('unknown error')
      return Promise.reject('unknown error')
    }
  }
)

export default service

export function request<T, R>(config: AxiosRequestConfig<T>): Promise<R> {
  return service(config) as unknown as Promise<R>
}
