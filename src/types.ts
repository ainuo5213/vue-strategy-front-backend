export interface StringKeyMap {
  [key: string]: string
}
export interface PaginationWrapper<T> {
  list: Array<T>
  page: number
  size: number
  total: number
}
