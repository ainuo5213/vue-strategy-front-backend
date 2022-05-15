import { TIME_STAMP, TOKEN_TIMEOUT } from '@/constant/user'
import { get, set } from '@/utils/storage'
export function getTimestamp() {
  return (get(TIME_STAMP) as number) || 0
}

export function setTimestamp() {
  set(TIME_STAMP, Date.now())
}

export function timeouted() {
  const timestamp = getTimestamp()
  const now = Date.now()
  return now - timestamp > TOKEN_TIMEOUT
}
