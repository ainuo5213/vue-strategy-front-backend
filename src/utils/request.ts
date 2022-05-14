import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const dynamicCode = '50EE9B3B30EAF75D'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

export interface CustomResponse<T> {
  code: number
  data: T
  message: string
  success: boolean
}

service.interceptors.request.use((config) => {
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    icode: dynamicCode
  }
  return config
})

service.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (resp: AxiosResponse<CustomResponse<any>>) => {
    const { data, status } = resp
    if (status === 200 && data.success && data.code === 200) {
      return Promise.resolve(data.data)
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
      return Promise.reject(data.data)
    }
  },
  (err) => {
    ElMessage({
      type: 'error',
      message: err.message
    })
  }
)

export default service
