import store from '@/store'
import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { timeouted } from './auth'

const dynamicCode = process.env.VUE_APP_DYNAMIC_CODE as string

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

service.interceptors.request.use(
  async (config) => {
    const language = store.getters.language || 'zh'
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': language,
      icode: dynamicCode
    }
    if (store.getters.token) {
      if (timeouted()) {
        await store.dispatch('user/doLogout')
        return Promise.reject(new Error('登录过期'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (resp: AxiosResponse<CustomResponse<any>>) => {
    const { data, status } = resp
    if (status === 200 && data.success && data.code === 200) {
      return Promise.resolve(data.data)
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
      return Promise.reject(new Error(data.message))
    }
  },
  async (err) => {
    // 服务端返回了401状态码，代表token过期了
    if (err?.response?.data.code === 401) {
      await store.dispatch('user/doLogout')
    }
    ElMessage({
      type: 'error',
      message: err.message
    })
    Promise.reject(err)
  }
)

export default service
