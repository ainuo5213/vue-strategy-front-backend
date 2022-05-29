import { isObject } from './is'

export function get<T>(key: string): T | string | null {
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
  } else if (value) {
    localStorage.setItem(key, value + '')
  } else {
    clear(key)
  }
}

export function clear(key: string): void {
  localStorage.removeItem(key)
}
