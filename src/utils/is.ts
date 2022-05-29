export const whiteList = ['/import', '/404', '/401', '/login']
export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object'
}

export function isPlainObject(value: any): boolean {
  return isObject(value) && Object.keys(value).length === 0
}

export function isTags(path: string) {
  return whiteList.includes(path)
}
