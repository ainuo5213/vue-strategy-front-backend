import { isObject } from './is'

export function get<T>(key: string): T | unknown {
  const value = localStorage.getItem(key)
  try {
    if (!value) {
      return null
    }
    return JSON.parse(value) as T
  } catch {
    return value
  }
}

export function set<T>(key: string, value: T): void {
  if (isObject(value)) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value + '')
  }
}
