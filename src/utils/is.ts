const additionWhiteList = ['/import', '/404', '/401']
export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object'
}

export function isPlainObject(value: any): boolean {
  return isObject(value) && Object.keys(value).length === 0
}

export function isTags(path: string) {
  return additionWhiteList.includes(path)
}
