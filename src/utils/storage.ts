import { isObject } from './is'

export function get<T>(key: string): T | undefined {
  try {
    const value = localStorage.getItem(key)
    if (!value) {
      return undefined
    }
    return JSON.parse(value) as T
  } catch {
    return undefined
  }
}

export function set<T>(key: string, value?: T): void {
  if (value) {
    if (isObject(value)) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value + '')
    }
  }
}
