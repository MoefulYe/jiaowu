import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { useStateStore } from '../stores/user-state'
import qs from 'qs'

const service = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  timeout: 30000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' })
})

service.interceptors.request.use(
  (config) => {
    config.headers['token'] = useStateStore().token()
    window.$loading.start()
    return config
  },
  (error: AxiosError<any>) => {
    window.$loading.error()
    window.$message.error(error.message)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (resp) => {
    /// TODO: 周五告诉后端修改返回状态码
    // if ((resp.data.code as number) !== 0) {
    //   window.$loading.error()
    //   window.$message.error(`${resp.data.message} (${resp.data.code})`)
    //   throw new Error(resp.data.message)
    // }
    window.$loading.finish()
    return resp.data.data
  },
  (error: AxiosError<any>) => {
    const resp = error.response
    console.log(error)
    window.$loading.error()
    if (resp !== undefined) {
      switch (resp.headers['Content-Type']) {
        case 'application/json':
          window.$message.error(`${resp.data.message} (${resp.status})`)
          break
        case 'plain/text':
          window.$message.error(`${resp.data} (${resp.status})`)
          break
        default:
          window.$message.error(`${error.message} (${resp.status})`)
      }
    } else {
      window.$message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
export const request = <T, R>(config: AxiosRequestConfig<T>): Promise<R> => service(config)
