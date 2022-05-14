import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  // 这个是拓展 axios 的 config 类型的，不用在意
  // export interface AxiosRequestConfig {}

  export interface AxiosInstance {
    <T>(config: AxiosRequestConfig): Promise<T>
    request<T>(config: AxiosRequestConfig): Promise<T>
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T>
    put<T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T>
    patch<T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<T>
  }
}
