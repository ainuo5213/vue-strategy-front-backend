import unAuthorizeRoutes from '@/router/routes/unauthorize-routes'
const additionWhiteList = ['/import']
export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object'
}

export function isPlainObject(value: any): boolean {
  return isObject(value) && Object.keys(value).length === 0
}

export function isTags(path: string) {
  const whiteList = unAuthorizeRoutes
    .map((r) => r.path)
    .concat(additionWhiteList)
  return whiteList.includes(path)
}
